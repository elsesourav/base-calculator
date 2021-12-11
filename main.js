"use strict";

const inputs = document.querySelectorAll(".inpts");
const res = document.querySelectorAll(".result");
const contaner = document.getElementById("contaner");
const clear = document.getElementById("clear");

let pattern = [
  /^[0-1, \+, \-, \*, \/, \×, \÷, \.]{0,10000}$/,
  /^[0-7, \+, \-, \*, \/, \×, \÷, \.]{0,10000}$/,
  /^[0-9, \+, \-, \*, \/, \×, \÷, \.]{0,10000}$/,
  /^[0-9,A,B,C,D,E,F, \+, \-, \*, \/, \×, \÷, \.]{0,10000}$/,
  /^[0-9,A-Z, \+, \-, \*, \/, \×, \÷, \.]{0,10000}$/,
];

clear.addEventListener("click", () => {
  inputs.forEach((e, i) => {
    e.value = ""; 
    res[i].value = "";
  })
  contaner.classList.add("active");
})

function formating(text) {
  let s = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] == "/") {
      s += "÷";
    } else if (text[i] == "*") {
      s += "×";
    } else {
      s += text[i];
    }
  }
  return s;
}

inputs.forEach((element, i) => {
  element.addEventListener("keyup", () => {
    let val = element.value.toUpperCase();
    element.value = formating(val);
    let vl = val.length;

    if (
      !pattern[i].test(val) ||
      (val[vl - 1] == "+" && val[vl - 2] == "+") ||
      (val[vl - 1] == "-" && val[vl - 2] == "-") ||
      (val[vl - 1] == "×" && val[vl - 2] == "×") ||
      (val[vl - 1] == "÷" && val[vl - 2] == "÷") ||
      (val[vl - 1] == "." && val[vl - 2] == ".") ||
      val[vl - 1] == " "
    ) {
      element.value = val.slice(0, -1);
    }
    if (val[0] == "N" && val[1] == "a") element.value = "";
    let nval = element.value;
    let VALUES = {
      number: [],
      modules: [],
    };
    let vn = VALUES.number,
      vm = VALUES.modules,
      result = false;

    let last = 0;
    for (let i = 0; i < nval.length; i++) {
      if (
        nval[i] == "+" ||
        nval[i] == "-" ||
        nval[i] == "×" ||
        nval[i] == "÷"
      ) {
        let vl = "";
        for (let j = last; j < i; j++) {
          vl += nval[j];
        }
        let mod = nval[i] == "×" ? "*" : nval[i] == "÷" ? "/" : nval[i];
        vm.push({
          mod: mod,
          index: i,
        });
        vn.push(vl);
        last = i + 1;
      }
    }
    if (vm.length != 0) {
      let vl = "";
      for (let i = vm[vm.length - 1].index + 1; i < nval.length; i++) {
        vl += nval[i];
      }
      if (vl != "") {
        vn.push(vl);
      }
    }
    if (vn.length == 0) {
      vn.push(nval);
    }

    let vnl = 0; 
    for (let ii = 0; ii < vn.length; ii++) {
      if (vn[ii].length > vnl) {
        vnl = vn[ii].length;
      }
    }

    if (vnl < 15) {
      // convert to allws base 10
      vn.forEach((E, index) => {
        if (i == 0) {
          vn[index] = base2_to10(E);
        } else if (i == 1) {
          vn[index] = base8_to10(E);
        } else if (i == 3) {
          vn[index] = base16_to10(E);
        } else if (i == 4) {
          vn[index] = base36_to10(E);
        }
      });

      // set input values
      inputs.forEach((ele, idn) => {
        let store = "";
        vn.forEach((E, index) => {
          store +=
            idn == 0
              ? base10_to2(vn[index])
              : idn == 1
              ? base10_to8(vn[index])
              : idn == 2
              ? vn[index]
              : idn == 3
              ? base10_to16(vn[index]).toUpperCase()
              : base10_to36(vn[index]).toUpperCase();
          if (vm[index] != undefined) {
            store += vm[index].mod;
          }
        });

        if (i != idn) {
          inputs[idn].value = formating(store);
        }
        if (store[0] == "N" && store[1].toUpperCase() == "A") {
          inputs[idn].value = "";
        }
      });
    } else {
      // convert to allws base 10
      vn.forEach((E, index) => {
        if (i == 0) {
          vn[index] = convert(E, 2);
        } else if (i == 1) {
          vn[index] = convert(E, 8);
        } else if (i == 3) {
          vn[index] = convert(E, 16);
        } else if (i == 4) {
          vn[index] = convert(E, 36);
        }
      });

      // set input values
      inputs.forEach((ele, idn) => {
        let store = "";
        vn.forEach((E, index) => {
          store +=
            idn == 0
              ? convert(vn[index], 10, 2)
              : idn == 1
              ? convert(vn[index], 10, 2)
              : idn == 2
              ? convert(vn[index], 10, 10)
              : idn == 3
              ? convert(vn[index], 10, 16).toUpperCase()
              : convert(vn[index], 10, 36).toUpperCase();
          if (vm[index] != undefined) {
            store += vm[index].mod;
          }
        });
        if (i != idn) {
          inputs[idn].value = formating(store);
        }
        if (store[0] == "N" && store[1].toUpperCase() == "A") {
          inputs[idn].value = "";
        }
      });
    }

    function setCal(ind, x) {
      vm.splice(ind, 1);
      vn[ind] = x;
      vn = kato(vn, ind + 1);
      if (!isNaN(x)) result = true;
    }

    vm.forEach((e, ind) => {
      if (e.mod == "/") setCal(ind, Number(vn[ind]) / Number(vn[ind + 1]));
    });
    vm.forEach((e, ind) => {
      if (e.mod == "*") setCal(ind, Number(vn[ind]) * Number(vn[ind + 1]));
    });
    vm.forEach((e, ind) => {
      if (e.mod == "+") setCal(ind, Number(vn[ind]) + Number(vn[ind + 1]));
    });
    vm.forEach((e, ind) => {
      if (e.mod == "-") setCal(ind, Number(vn[ind]) - Number(vn[ind + 1]));
    });

    contaner.classList.add("active");
    if (result) {
      contaner.classList.remove("active");
      res[0].value = base10_to2(vn[0]);
      res[1].value = base10_to8(vn[0]);
      res[2].value = vn[0];
      res[3].value = base10_to16(vn[0]).toUpperCase();
      res[4].value = base10_to36(vn[0]).toUpperCase();
    }
  });
});

let base10_to16 = ($) => {
  return Number($).toString(16);
};
let base10_to36 = ($) => {
  return Number($).toString(36);
};
let base10_to8 = ($) => {
  return Number($).toString(8);
};
let base10_to2 = ($) => {
  return Number($).toString(2);
};
function splitsPoints(element, base) {
  let s = "";
  element.forEach((e, index) => {
    if (index > 0) s += ".";
    if (e != "") s += parseInt(e, base);
  });
  return s;
}
let base16_to10 = ($) => {
  let spl = $.toString().split(".");
  return Number(splitsPoints(spl, 16));
};
let base36_to10 = ($) => {
  let spl = $.toString().split(".");
  return Number(splitsPoints(spl, 36));
};
let base8_to10 = ($) => {
  let spl = $.toString().split(".");
  return Number(splitsPoints(spl, 8));
};
let base2_to10 = ($) => {
  let spl = $.toString().split(".");
  return Number(splitsPoints(spl, 2));
};

function kato(array, x) {
  let arr = [];
  array.forEach((e, ind) => {
    if (ind !== x) {
      arr.push(e);
    }
  });
  return arr;
}

function splBinary(x) {
  return x.toString(36).toUpperCase();
}

function convert(value, nowbase, toBase = 10) {
  return [...value.toString()]
    .reduce((r, v) => r * BigInt(nowbase) + BigInt(parseInt(v, nowbase)), 0n)
    .toString(toBase);
}

