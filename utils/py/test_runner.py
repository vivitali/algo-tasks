#!/usr/bin/env python3

"""
DSA Practice - Python Test Runner

This utility runs and tests algorithm implementations with customizable options
for testing, benchmarking, and visualization.

Usage:
  python test_runner.py <path> [options]

Examples:
  python test_runner.py algorithms/searching/binary_search
  python test_runner.py problems/easy/two_sum --benchmark
"""

import os
import sys
import json
import time
import inspect
import importlib.util
import argparse
import statistics
from typing import Any, Dict, List, Tuple, Optional, Union, Callable


# ANSI colors for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'


# Configuration
CONFIG = {
    "benchmark_mode": False,
    "verbose": False,
    "visualize": False
}


def parse_args() -> Tuple[str, Dict[str, Any]]:
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(description="DSA Practice - Python Test Runner")
    parser.add_argument("path", nargs="?", help="Path to the algorithm or problem")
    parser.add_argument("--benchmark", action="store_true", help="Run performance benchmarks")
    parser.add_argument("--verbose", action="store_true", help="Show detailed execution information")
    parser.add_argument("--visualize", action="store_true", help="Show visualization when available")
    
    # Parse known args first to handle the standard flags
    args, unknown = parser.parse_known_args()
    
    # Handle custom parameters (--param=value)
    options = {}
    for arg in unknown:
        if arg.startswith("--"):
            if "=" in arg:
                key, value = arg[2:].split("=", 1)
                # Try to convert to appropriate type
                try:
                    # Try as int
                    options[key] = int(value)
                except ValueError:
                    try:
                        # Try as float
                        options[key] = float(value)
                    except ValueError:
                        # Keep as string
                        options[key] = value
            else:
                options[arg[2:]] = True
    
    # Update config
    CONFIG["benchmark_mode"] = args.benchmark
    CONFIG["verbose"] = args.verbose
    CONFIG["visualize"] = args.visualize
    
    return args.path, options


def show_help() -> None:
    """Display help information."""
    print(f"{Colors.BOLD}\nDSA Practice - Python Test Runner\n{Colors.END}")
    print(f"""Usage:
  {Colors.YELLOW}python test_runner.py{Colors.END} {Colors.GREEN}<path>{Colors.END} [options]

Examples:
  {Colors.YELLOW}python test_runner.py{Colors.END} {Colors.GREEN}algorithms/searching/binary_search{Colors.END}
  {Colors.YELLOW}python test_runner.py{Colors.END} {Colors.GREEN}problems/easy/two_sum{Colors.END} {Colors.CYAN}--benchmark{Colors.END}

Options:
  {Colors.CYAN}--benchmark{Colors.END}    Run performance benchmarks
  {Colors.CYAN}--verbose{Colors.END}      Show detailed execution information
  {Colors.CYAN}--visualize{Colors.END}    Show visualization (when available)
  {Colors.CYAN}--param=value{Colors.END}  Pass custom parameters
  {Colors.CYAN}--help{Colors.END}         Show this help message
    """)


def import_module_from_path(module_path: str) -> Any:
    """Import a Python module from a file path."""
    try:
        # Handle both absolute and relative paths
        if not os.path.isabs(module_path):
            module_path = os.path.abspath(module_path)
        
        # Check if path exists with .py extension
        if not module_path.endswith('.py'):
            if os.path.exists(f"{module_path}.py"):
                module_path = f"{module_path}.py"
            else:
                # Try to find matching Python files
                dir_path = os.path.dirname(module_path)
                base_name = os.path.basename(module_path)
                py_files = [f for f in os.listdir(dir_path) 
                           if f.endswith('.py') and f.startswith(base_name)]
                
                if py_files:
                    module_path = os.path.join(dir_path, py_files[0])
                else:
                    raise FileNotFoundError(f"No Python file found at {module_path}")
        
        # Now we have a valid .py file path
        module_name = os.path.basename(module_path).replace('.py', '')
        spec = importlib.util.spec_from_file_location(module_name, module_path)
        if spec is None:
            raise ImportError(f"Could not load spec for {module_path}")
        
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)  # type: ignore
        return module
        
    except Exception as e:
        print(f"{Colors.RED}Error loading module:{Colors.END} {str(e)}")
        sys.exit(1)


def find_main_function(module: Any) -> Callable:
    """Find the main function to test in the module."""
    # Look for common function names
    candidates = ['solution', 'run', 'main']
    
    # Try to find by common names
    for name in candidates:
        if hasattr(module, name):
            return getattr(module, name)
    
    # If no common names found, look for any callable that's not internal
    functions = [obj for name, obj in inspect.getmembers(module, inspect.isfunction)
                if not name.startswith('_')]
    
    if len(functions) > 0:
        return functions[0]
    
    raise ValueError("Could not determine which function to test")


def load_test_cases(module_path: str) -> Optional[List[Dict[str, Any]]]:
    """Load test cases for the module."""
    try:
        base_dir = os.path.dirname(module_path)
        test_case_path = os.path.join(base_dir, 'test_cases.json')
        
        if os.path.exists(test_case_path):
            with open(test_case_path, 'r') as f:
                return json.load(f)
        
        # Try to find in problems directory structure
        if 'problems' in module_path:
            problem_dir = os.path.dirname(module_path)
            test_case_path = os.path.join(problem_dir, 'test_cases.json')
            
            if os.path.exists(test_case_path):
                with open(test_case_path, 'r') as f:
                    return json.load(f)
        
        return None
        
    except Exception as e:
        print(f"{Colors.YELLOW}Warning:{Colors.END} Could not load test cases: {str(e)}")
        return None


def run_tests(main_function: Callable, test_cases: List[Dict[str, Any]]) -> Dict[str, int]:
    """Run tests on the module."""
    print(f"{Colors.BOLD}\nRunning tests:{Colors.END}")
    
    passed = 0
    failed = 0
    
    for i, test in enumerate(test_cases):
        input_data = test['input']
        expected = test['expected']
        
        try:
            # Handle different input formats
            args = input_data if isinstance(input_data, list) else [input_data]
            
            start_time = time.time()
            result = main_function(*args)
            end_time = time.time()
            
            # Check if result matches expected output
            test_passed = result == expected
            
            if test_passed:
                print(f"{Colors.GREEN}✓ Test {i + 1} passed{Colors.END}"
                      f"{Colors.HEADER} ({((end_time - start_time) * 1000):.3f}ms){Colors.END}")
                passed += 1
            else:
                print(f"{Colors.RED}✗ Test {i + 1} failed{Colors.END}")
                print(f"  Input:    {input_data}")
                print(f"  Expected: {expected}")
                print(f"  Got:      {result}")
                failed += 1
                
        except Exception as e:
            print(f"{Colors.RED}✗ Test {i + 1} failed with error: {str(e)}{Colors.END}")
            failed += 1
    
    print(f"{Colors.BOLD}\nResults: {passed} passed, {failed} failed\n{Colors.END}")
    return {"passed": passed, "failed": failed}


def run_benchmarks(main_function: Callable, test_cases: Optional[List[Dict[str, Any]]]) -> None:
    """Run benchmarks on the module."""
    print(f"{Colors.BOLD}\nRunning benchmarks:{Colors.END}")
    
    RUNS = 1000
    test_inputs = [test['input'] for test in test_cases] if test_cases else [[]]
    
    for i, input_data in enumerate(test_inputs):
        print(f"{Colors.YELLOW}\nBenchmarking Test Case {i + 1}:{Colors.END}")
        
        # Handle different input formats
        args = input_data if isinstance(input_data, list) else [input_data]
        times = []
        
        # Warm up
        for _ in range(10):
            main_function(*args)
        
        # Actual benchmark
        for _ in range(RUNS):
            start_time = time.time()
            main_function(*args)
            end_time = time.time()
            times.append((end_time - start_time) * 1000)  # Convert to ms
        
        avg_time = statistics.mean(times)
        min_time = min(times)
        max_time = max(times)
        
        print(f"  Average time: {Colors.CYAN}{avg_time:.6f}{Colors.END} ms")
        print(f"  Min time:     {Colors.CYAN}{min_time:.6f}{Colors.END} ms")
        print(f"  Max time:     {Colors.CYAN}{max_time:.6f}{Colors.END} ms")


def main() -> None:
    """Main function."""
    module_path, options = parse_args()
    
    if not module_path:
        print(f"{Colors.RED}Error:{Colors.END} Module path not specified")
        show_help()
        sys.exit(1)
    
    # Load the module
    module = import_module_from_path(module_path)
    
    # Find the main function
    main_function = find_main_function(module)
    
    # Load test cases if available
    test_cases = load_test_cases(module_path)
    
    if test_cases:
        # Run tests
        run_tests(main_function, test_cases)
        
        # Run benchmarks if requested
        if CONFIG["benchmark_mode"]:
            run_benchmarks(main_function, test_cases)
    else:
        print(f"{Colors.YELLOW}\nNo test cases found.{Colors.END} Create a test_cases.json file in the same directory.")
        
        if CONFIG["benchmark_mode"]:
            print(f"{Colors.YELLOW}\nRunning benchmarks with empty input:{Colors.END}")
            run_benchmarks(main_function, None)
    
    # Try to run visualization if requested
    if CONFIG["visualize"] and hasattr(module, 'visualize'):
        print(f"{Colors.BOLD}\nVisualization:{Colors.END}")
        module.visualize()


if __name__ == "__main__":
    main()