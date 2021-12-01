"use strict";

const inputs = document.querySelectorAll("input");
const res = document.querySelectorAll(".result");

let pattern = [
  /^[0-1, \+, \-, \*, \/, \×, \÷]{0,100}$/,
  /^[0-7, \+, \-, \*, \/, \×, \÷]{0,100}$/,
  /^[0-9, \+, \-, \*, \/, \×, \÷]{0,100}$/,
  /^[0-9,A,B,C,D,E,F, \+, \-, \*, \/, \×, \÷]{0,100}$/,
];
let mod = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
let array = "";
inputs.forEach((e, i) => {
  e.addEventListener("keyup", () => {
    let val = e.value.toUpperCase();
    let vl = val.length;
    if (
      !pattern[i].test(val) ||
      (val[vl - 1] == "*" && val[vl - 2] == "*") ||
      (val[vl - 1] == "-" && val[vl - 2] == "-") ||
      (val[vl - 1] == "+" && val[vl - 2] == "+") ||
      (val[vl - 1] == "/" && val[vl - 2] == "/") ||
      (val[vl - 1] == "×" && val[vl - 2] == "×") ||
      (val[vl - 1] == "÷" && val[vl - 2] == "÷")
    ) {
      val = val.slice(0, -1);
    }

    let newVal = "";
    let split_val = val.split("");
    for (let i = 0; i < split_val.length; i++) {
      if (split_val[i] == " " && split_val[i + 1] == " ") {
        continue;
      } else {
        newVal += split_val[i];
      }
    }
    val = newVal.split(" ");
    let nv = newVal.split("");

    let modIndex = [];
    let string = "";
    for (let i = 0; i < nv.length; i++) {
      modIndex[i] = [];
      if (isNaN(nv[i])) {
        modIndex[0].push(i);
      }
    }

    for (let i = 0; i < nv.length; i++) {
      if (match(i, modIndex[0])) {
        string += ` ${nv[i]} `;
      } else {
        string += nv[i];
      }
    }
    function match(textI, indexs) {
      for (let i = 0; i < indexs.length; i++) {
        if (textI == modIndex[0][i]) {
          modIndex[0].shift();
          return true;
        }
        return false;
      }
    }

    let nstring = string.split(" ");
    for (let i = 0; i < nstring.length; i++) {
      if (nstring[i] == "") {
        nstring.pop();
      }
    }

    let bases = [];

    for (let i = 0; i < nstring.length; i++) {
      bases[i] = [];
      if (isNaN(nstring[i])) {
        bases[i] = nstring[i];
      } else {
        if (inputs[0] == e) {
          bases[i] = base2_to10(nstring[i]);
        } else if (inputs[1] == e) {
          bases[i] = base8_to10(nstring[i]);
        } else if (inputs[2] == e) {
          bases[i] = parseInt(nstring[i]);
        } else if (inputs[3] == e) {
          bases[i] = base16_to10(nstring[i]);
        }
      }
    }

    inputs.forEach((E) => {
      E.value = "";
    });
    let outputs = [];
    for (let i = 0; i < bases.length; i++) {
      outputs[i] = [];
      outputs[i].push(base10_to2(bases[i]));
      outputs[i].push(base10_to8(bases[i]));
      outputs[i].push(bases[i]);
      outputs[i].push(base10_to16(bases[i]).toUpperCase());
    }
    outputs.forEach((E) => {
      E.forEach((out, i) => {
        inputs[i].value += out;
      });
    });

    let result = [];
    let ss = 0;
    res.forEach((element) => {
      element.style.display = "none";
    });
      
    if (
      outputs.length == 3 ||
      (outputs.length / 2 != 0 && outputs.length > 2)
    ) {
      for (let i = 0; i < outputs.length; i++) {
        result[i] = outputs[i][2];
      }

      console.log(result);
      if (result[1] == "/" || result[1] == "÷") {
        ss = result[0] / result[2];
      } else if (result[1] == "×" || result[1] == "*") {
        ss = result[0] * result[2];
      } else if (result[1] == "+") {
        ss = result[0] + result[2];
      } else if (result[1] == "-") {
        ss = result[0] - result[2];
      }

      res.forEach((element) => {
        element.style.display = "flex";
      });
      res[0].innerText = base10_to2(Number(ss.toFixed(2)));
      res[1].innerText = base10_to8(Number(ss.toFixed(2)));
      res[2].innerText = Number(ss.toFixed(2));
      res[3].innerText = base10_to16(Number(ss.toFixed(2)));
    }
  });
});

let base10_to16 = ($) => {
  return $.toString(16);
};
let base10_to8 = ($) => {
  return $.toString(8);
};
let base10_to2 = ($) => {
  return $.toString(2);
};
let base16_to10 = ($) => {
  return parseInt($, 16);
};
let base8_to10 = ($) => {
  return parseInt($, 8);
};
let base2_to10 = ($) => {
  return parseInt($, 2);
};
