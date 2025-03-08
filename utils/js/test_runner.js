#!/usr/bin/env node

/**
 * DSA Practice - JavaScript Test Runner
 * 
 * This utility runs and tests algorithm implementations with customizable options
 * for testing, benchmarking, and visualization.
 * 
 * Usage:
 *   node test_runner.js <path> [options]
 * 
 * Examples:
 *   node test_runner.js algorithms/searching/binary_search
 *   node test_runner.js problems/easy/two_sum --benchmark
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const chalk = require('chalk');

// Configuration
const CONFIG = {
  benchmarkMode: false,
  verbose: false,
  visualize: false,
  testCases: null
};

/**
 * Parse command-line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsedArgs = { path: null, options: {} };
  
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const option = args[i].slice(2);
      if (option === 'benchmark') CONFIG.benchmarkMode = true;
      else if (option === 'verbose') CONFIG.verbose = true;
      else if (option === 'visualize') CONFIG.visualize = true;
      else if (option === 'help') {
        showHelp();
        process.exit(0);
      }
      else if (option.includes('=')) {
        const [key, value] = option.split('=');
        parsedArgs.options[key] = value;
      }
      else parsedArgs.options[option] = true;
    } else if (!parsedArgs.path) {
      parsedArgs.path = args[i];
    }
  }
  
  return parsedArgs;
}

/**
 * Show help information
 */
function showHelp() {
  console.log(chalk.bold('\nDSA Practice - JavaScript Test Runner\n'));
  console.log(`Usage:
  ${chalk.yellow('node test_runner.js')} ${chalk.green('<path>')} [options]

Examples:
  ${chalk.yellow('node test_runner.js')} ${chalk.green('algorithms/searching/binary_search')}
  ${chalk.yellow('node test_runner.js')} ${chalk.green('problems/easy/two_sum')} ${chalk.cyan('--benchmark')}

Options:
  ${chalk.cyan('--benchmark')}    Run performance benchmarks
  ${chalk.cyan('--verbose')}      Show detailed execution information
  ${chalk.cyan('--visualize')}    Show visualization (when available)
  ${chalk.cyan('--param=value')}  Pass custom parameters
  ${chalk.cyan('--help')}         Show this help message
  `);
}

/**
 * Load algorithm or problem solution module
 */
function loadModule(modulePath) {
  try {
    // Handle both absolute and relative paths
    const resolvedPath = path.isAbsolute(modulePath) 
      ? modulePath 
      : path.resolve(process.cwd(), modulePath);
    
    // Try different extensions if none provided
    if (!path.extname(resolvedPath)) {
      if (fs.existsSync(`${resolvedPath}.js`)) {
        return require(`${resolvedPath}.js`);
      } else {
        const jsFiles = fs.readdirSync(path.dirname(resolvedPath))
          .filter(file => file.endsWith('.js') && 
                          file.startsWith(path.basename(resolvedPath)));
        
        if (jsFiles.length > 0) {
          return require(path.join(path.dirname(resolvedPath), jsFiles[0]));
        }
      }
    } else {
      return require(resolvedPath);
    }
    
    throw new Error(`Module not found: ${modulePath}`);
  } catch (err) {
    console.error(chalk.red('Error loading module:'), err.message);
    process.exit(1);
  }
}

/**
 * Load test cases for the module
 */
function loadTestCases(modulePath) {
  try {
    const baseDir = path.dirname(modulePath);
    const testCasePath = path.join(baseDir, 'test_cases.json');
    
    if (fs.existsSync(testCasePath)) {
      const testCases = JSON.parse(fs.readFileSync(testCasePath, 'utf8'));
      return testCases;
    }
    
    // Try to find in problems directory structure
    if (modulePath.includes('problems')) {
      const problemDir = path.dirname(modulePath);
      const testCasePath = path.join(problemDir, 'test_cases.json');
      
      if (fs.existsSync(testCasePath)) {
        return JSON.parse(fs.readFileSync(testCasePath, 'utf8'));
      }
    }
    
    return null;
  } catch (err) {
    console.error(chalk.yellow('Warning:'), 'Could not load test cases:', err.message);
    return null;
  }
}

/**
 * Run tests on the module
 */
function runTests(module, testCases) {
  console.log(chalk.bold('\nRunning tests:'));
  
  let passed = 0;
  let failed = 0;
  
  for (let i = 0; i < testCases.length; i++) {
    const test = testCases[i];
    const { input, expected } = test;
    
    try {
      // Determine the main function to call
      const mainFunction = module.default || module.solution || 
                          module.run || Object.values(module)[0];
      
      if (typeof mainFunction !== 'function') {
        throw new Error('Could not determine which function to test');
      }
      
      // Handle different input formats
      let args = Array.isArray(input) ? input : [input];
      const startTime = performance.now();
      const result = mainFunction(...args);
      const endTime = performance.now();
      
      // Check if result matches expected output
      const passed = JSON.stringify(result) === JSON.stringify(expected);
      
      if (passed) {
        console.log(chalk.green(`✓ Test ${i + 1} passed`) + 
                    chalk.gray(` (${(endTime - startTime).toFixed(3)}ms)`));
        passed++;
      } else {
        console.log(chalk.red(`✗ Test ${i + 1} failed`));
        console.log(`  Input:    ${JSON.stringify(input)}`);
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(result)}`);
        failed++;
      }
    } catch (err) {
      console.log(chalk.red(`✗ Test ${i + 1} failed with error: ${err.message}`));
      failed++;
    }
  }
  
  console.log(chalk.bold(`\nResults: ${passed} passed, ${failed} failed\n`));
  return { passed, failed };
}

/**
 * Run benchmarks on the module
 */
function runBenchmarks(module, testCases) {
  console.log(chalk.bold('\nRunning benchmarks:'));
  
  // Determine the main function to benchmark
  const mainFunction = module.default || module.solution || 
                      module.run || Object.values(module)[0];
  
  if (typeof mainFunction !== 'function') {
    console.error(chalk.red('Error:'), 'Could not determine which function to benchmark');
    return;
  }
  
  const RUNS = 1000;
  const testInputs = testCases ? testCases.map(t => t.input) : [[]];
  
  testInputs.forEach((input, index) => {
    console.log(chalk.yellow(`\nBenchmarking Test Case ${index + 1}:`));
    
    // Handle different input formats
    let args = Array.isArray(input) ? input : [input];
    const times = [];
    
    // Warm up
    for (let i = 0; i < 10; i++) {
      mainFunction(...args);
    }
    
    // Actual benchmark
    for (let i = 0; i < RUNS; i++) {
      const startTime = performance.now();
      mainFunction(...args);
      const endTime = performance.now();
      times.push(endTime - startTime);
    }
    
    const avgTime = times.reduce((sum, time) => sum + time, 0) / RUNS;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    
    console.log(`  Average time: ${chalk.cyan(avgTime.toFixed(6))} ms`);
    console.log(`  Min time:     ${chalk.cyan(minTime.toFixed(6))} ms`);
    console.log(`  Max time:     ${chalk.cyan(maxTime.toFixed(6))} ms`);
  });
}

/**
 * Main function
 */
function main() {
  const args = parseArgs();
  
  if (!args.path) {
    console.error(chalk.red('Error:'), 'Module path not specified');
    showHelp();
    process.exit(1);
  }
  
  // Load the module
  const module = loadModule(args.path);
  
  // Load test cases if available
  const testCases = loadTestCases(args.path);
  
  if (testCases) {
    // Run tests
    runTests(module, testCases);
    
    // Run benchmarks if requested
    if (CONFIG.benchmarkMode) {
      runBenchmarks(module, testCases);
    }
  } else {
    console.log(chalk.yellow('\nNo test cases found.'), 'Create a test_cases.json file in the same directory.');
    
    if (CONFIG.benchmarkMode) {
      console.log(chalk.yellow('\nRunning benchmarks with empty input:'));
      runBenchmarks(module, null);
    }
  }
  
  // Try to run visualization if requested
  if (CONFIG.visualize && typeof module.visualize === 'function') {
    console.log(chalk.bold('\nVisualization:'));
    module.visualize();
  }
}

// Run the program
main();