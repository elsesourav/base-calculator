# Base Calculator

A multi-base calculator that allows arithmetic operations across different number systems with real-time conversion.

## 🚀 Features

- Supports:
  - Binary (Base 2)
  - Octal (Base 8)
  - Decimal (Base 10)
  - Hexadecimal (Base 16)
  - Base 36
- Operations:
  - Addition (+)
  - Subtraction (-)
  - Multiplication (×)
  - Division (÷)
- Automatic conversion between all bases
- Operator precedence handling
- Input validation for each base
- Supports large numbers using BigInt
- Real-time synchronization across inputs

---

## 🧠 How It Works

1. User enters an expression in any base input.
2. The input is validated using base-specific patterns.
3. Values are converted to base-10 internally.
4. Arithmetic operations are evaluated with correct precedence.
5. The final result is converted and displayed in all supported bases.

---

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript (ES6+)
- BigInt for large number handling

---

## ⚠️ Limitations

- Decimal fractions are limited when using BigInt-based conversion.
- Very long expressions may affect performance.

---

## 📌 Future Improvements

- Full fractional (decimal point) support in BigInt mode
- Keyboard button UI
- Expression history
- Scientific operations
- Mobile optimization

---

## 📄 License

This project is open-source and free to use for learning and personal projects.
