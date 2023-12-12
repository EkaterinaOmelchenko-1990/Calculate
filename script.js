const display = document.getElementById('display');
$btn = document.querySelectorAll('.btn');
let arr_input = [];


function calculate(btnValue) {
  let value = btnValue.innerText;
  if (value === "AC") {
    arr_input = [];
    display.value = "";
  } else if (value === '\u2190') {
    arr_input.pop();
    display.value = arr_input.join("");
  } else {
    if (isNaN(value)
      && isNaN(arr_input[arr_input.length - 1])
      && arr_input[arr_input.length - 1] != '%') {
      arr_input.pop();
    }
    if (display.value === '' && value === '=') {
      return;
    }
    arr_input.push(value);
    display.value = arr_input.join("");
    if (value === '=') {
      let newArr = [];
      arr_input.pop();
      try {
        let arr = [];
        reg = /\d+\.*\d*|([\%\+\*\-\/]+)/g;
        arr = arr_input.join("").match(reg);
        let index = 0;
        let loop = 0;

        while (arr.length > 1 && loop < 3) {
          let partInput = arr[index] + arr[index + 1] + arr[index + 2];
          console.log(partInput);
          let isMultiplication = /^(([0-9]*[.,])?[0-9]+)\*+(([0-9]*[.,])?[0-9]+)/.test(partInput);
          let isDivision = /^(([0-9]*[.,])?[0-9]+)\/+(([0-9]*[.,])?[0-9]+)/.test(partInput);
          if (arr.length >= (index + 4)) {
            partInput += arr[index + 3];
          }
          let isPercentMultiplication = /^\d+\.*\d*\*\d+\.*\d*\%/g.test(partInput);
          let isPercentDivision = /^(([0-9]*[.,])?[0-9]+)\/+(([0-9]*[.,])?[0-9]+)\%/.test(partInput);
          let isAddition = /^(([0-9]*[.,])?[0-9]+)\++(([0-9]*[.,])?[0-9]+)/.test(partInput);
          let isSubtraction = /^(([0-9]*[.,])?[0-9]+)\-+(([0-9]*[.,])?[0-9]+)*/.test(partInput);
          if (arr.length >= (index + 5)) {
            partInput += arr[index + 4];
          }
          let isPercentAddition = /^(([0-9]*[.,])?[0-9]+)\++(([0-9]*[.,])?[0-9]+)\%+([\+\-]*)/.test(partInput);
          let isPercentSubtraction = /^(([0-9]*[.,])?[0-9]+)\-+(([0-9]*[.,])?[0-9]+)\%+([\+\-]*)/.test(partInput);

          if (isMultiplication) {
            loop = 0;
            if (isPercentMultiplication) {
              arr[index + 3] = arr[index + 2] * arr[index] / 100;
              arr = (arr.slice(0, index) + ((index === 0) ? '' : ',') + arr.slice(index + 3)).toString().split(',');
              index = index + 3;
            }
            else {
              arr[index + 2] *= arr[index];
              arr = (arr.slice(0, index) + ((index === 0) ? '' : ',') + arr.slice(index + 2)).toString().split(',');
              index = index + 2;
            }
          }
          else if (isDivision) {
            loop = 0;
            if (isPercentDivision) {
              arr[index + 3] = arr[index + 2] / (arr[index] / 100);
              arr = (arr.slice(0, index) + ((index === 0) ? '' : ',') + arr.slice(index + 3)).toString().split(',');
              index = index + 3;
            }
            else {
              arr[index + 2] = arr[index] / arr[index + 2];
              arr = (arr.slice(0, index) + ((index === 0) ? '' : ',') + arr.slice(index + 2)).toString().split(',');
              index = index + 2;
            }
          }
          else if (isAddition && !isPercentAddition) {
            if (!((arr.length >= (index + 4))
              && (arr[index + 3] === '*' || arr[index + 3] === '/'))) {
              arr[index + 2] += arr[index];
              arr = (arr.slice(0, index) + ((index === 0) ? '' : ',') + arr.slice(index + 2)).toString().split(',');
            }
            index = index + 2;
            loop = 0;
          }
          else if (isSubtraction && !isPercentSubtraction) {
            if (!((arr.length >= (index + 4))
              && (arr[index + 3] === '*' || arr[index + 3] === '/'))) {
              arr[index + 2] = arr[index] - arr[index + 2];
              arr = (arr.slice(0, index) + ((index === 0) ? '' : ',') + arr.slice(index + 2)).toString().split(',');
            }
            index = index + 2;
            loop = 0;
          }
          else if (isPercentAddition) {
            arr[index + 3] = Number.parseFloat(arr[index]) + ((arr[index] * arr[index + 2]) / 100);
            arr = (arr.slice(0, index) + ((index === 0) ? '' : ',') + arr.slice(index + 3)).toString().split(',');
            index = index + 3;
            loop = 0;
          }
          else if (isPercentSubtraction) {
            arr[index + 3] = arr[index] - arr[index] * arr[index + 2] / 100;
            arr = (arr.slice(0, index) + ((index === 0) ? '' : ',') + arr.slice(index + 3)).toString().split(',');
            index = index + 3;
            loop = 0;
          }
          else {
            loop++;
            index += 2;
          }
          if (index >= arr.length - 1) {
            index = 0;
          }
          console.log("index=" + index);
          console.log("loop=" + loop);
          console.log("arr.length" + arr.length);
          console.log(arr);
        }
        if (arr.length > 1) { throw "Ошибка1" }
        display.value = arr[0];
      }
      catch (err) {

        console.log(err);
        display.value = "Ошибка2"
      }
    }


  }
}

$btn.forEach(item => item.addEventListener('click', (event) => {
  btnValue = event.target;
  calculate(btnValue);
}));

