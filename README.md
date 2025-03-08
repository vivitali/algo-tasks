# DSA Practice Repository

A comprehensive collection of data structures and algorithms for coding interview preparation. This repository is structured to optimize learning and practice with implementations in both JavaScript and Python.

![GitHub repo size](https://img.shields.io/github/repo-size/vivitali/algo-tasks)
![GitHub last commit](https://img.shields.io/github/last-commit/vivitali/algo-tasks)
![GitHub stars](https://img.shields.io/github/stars/vivitali/algo-tasks?style=social)

## 📚 Repository Structure

The repository is designed for efficient interview preparation:

- **Algorithms**: Common algorithms organized by category
- **Data Structures**: Implementations with usage examples
- **Problems**: Real interview problems organized by difficulty
- **Patterns**: Common algorithm patterns with explanations
- **Cheatsheets**: Quick reference guides for interviews
- **Utils**: Helper tools for testing and visualization

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ for JavaScript implementations
- Python 3.8+ for Python implementations
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dsa-practice.git
cd dsa-practice

# Install JavaScript dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

## 💡 How to Use

### Learning Algorithm Patterns

Start with the `patterns/` directory to understand common algorithm patterns. Each pattern includes:
- Explanation of the technique
- When to use it
- Example problems where it applies

### Practicing Problems

Problems are organized by difficulty:
- `problems/easy/` - Fundamental problems
- `problems/medium/` - Intermediate challenges
- `problems/hard/` - Advanced problems

Each problem includes:
- Problem statement
- Solution in JavaScript and Python
- Test cases

### Running Tests

```bash
# JavaScript
npm test -- problems/easy/two_sum

# Python
python utils/py/test_runner.py problems/easy/two_sum
```

## 📆 Study Plan

For effective interview preparation:

1. **Week 1-2**: Learn basic data structures (arrays, strings, linked lists)
2. **Week 3-4**: Study core algorithms (sorting, searching)
3. **Week 5-6**: Practice pattern recognition with medium problems
4. **Week 7-8**: Tackle advanced topics (dynamic programming, graphs)
5. **Week 9+**: Mock interviews and hard problems

## 🧠 Algorithm Patterns

Understanding these patterns helps solve many problems:

1. **Two Pointers**: For problems involving sorted arrays, palindromes
2. **Sliding Window**: For problems involving subarrays/substrings
3. **Fast & Slow Pointers**: For cycle detection, middle elements
4. **Merge Intervals**: For interval-related problems
5. **Depth-First Search**: For tree/graph traversal
6. **Breadth-First Search**: For shortest path problems
7. **Dynamic Programming**: For optimization problems

## 📊 Big O Cheatsheet

| Data Structure | Access | Search | Insertion | Deletion |
|----------------|--------|--------|-----------|----------|
| Array          | O(1)   | O(n)   | O(n)      | O(n)     |
| Linked List    | O(n)   | O(n)   | O(1)      | O(1)     |
| Hash Table     | N/A    | O(1)   | O(1)      | O(1)     |
| Binary Tree    | O(log n)| O(log n)| O(log n)  | O(log n) |
| Heap           | O(1)   | O(n)   | O(log n)  | O(log n) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-solution`)
3. Commit your changes (`git commit -m 'Add a new solution for problem X'`)
4. Push to the branch (`git push origin feature/amazing-solution`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.