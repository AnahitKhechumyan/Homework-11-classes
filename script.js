function bubbleSortFun(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = 
                            [arr[j + 1], arr[j]];
            }
        }
    }   
    return arr;
};
function selectionSortFun(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = 
                    [arr[minIndex], arr[i]];
        }
    }
    return arr;
};
function insertionSortFun(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
};
function mergeSortFun(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSortFun(arr.slice(0, mid));
    const right = mergeSortFun(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length &&
            rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex))
                 .concat(right.slice(rightIndex));
};


const clearInputText = function(){
    document.getElementById("text-input").value = "";
    document.getElementById("result-display").innerText = "";
};

const bubbleSortButton = document.getElementById("bubble-sort-button");
const selectionSortButton = document.getElementById("selection-sort-button");
const insertionSortButton = document.getElementById("insertion-sort-button");
const mergeSortButton = document.getElementById("merge-sort-button");  

const sortFunctionName =  {
    "bubble-sort--button": bubbleSortFun,
    "selection-sort-button": selectionSortFun,
    "insertion-sort-button": insertionSortFun,
    "merge-sort-button": mergeSortFun
};
 
const getSortFunction = (sortFunctionName) => {
    switch (sortFunctionName) {
        case "bubble-sort-button":
            return bubbleSortFun;
        case "selection-sort-button":
            return selectionSortFun;
        case "insertion-sort-button":
            return insertionSortFun;
        case "merge-sort-button":
            return mergeSortFun;
        default:
            return null;
    }
  };

class CacheCalculator{
    constructor(){
        this.cache = new Map();
    };
     
    getSortFunction(sortFunctionName) {
        switch (sortFunctionName) {
            case bubbleSortButton.id:
                return bubbleSortFun;
            case selectionSortButton.id:
                return selectionSortFun;
            case insertionSortButton.id:
                return insertionSortFun;
            case mergeSortButton.id:
                return mergeSortFun;
            default:
                return null;
        }
    };

    calculate(arr) {
        const key = arr.join(',');
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        
        const sortFunc = this.getSortFunction(currentSortFunction);
        if (!sortFunc) {
            document.getElementById("result-display").innerHTML = `<p style="color: #F44336">No numbers to sort</p>`;
            return arr;
        }
        
        const sortedResult = sortFunc(arr.slice());
        this.cache.set(key, sortedResult);
        return sortedResult;
    }
};   

const calculate = new CacheCalculator();
 
const sortButton = [bubbleSortButton, selectionSortButton, insertionSortButton, mergeSortButton];
 
sortButton.forEach(button => {
    button.addEventListener("click", function() {
        const sortFunc = calculate.getSortFunction(button.id);
        if (!sortFunc) {
            return;
        }

        const inputText = document.getElementById("text-input").value;
        const arr = inputText.split(",").map(Number);

        if (arr.some(isNaN)) {
            document.getElementById("result-display").innerHTML = `<p style="color: #F44336">Please enter valid numbers by comma or space.</p>`;
            return;
        }
        const result = calculate.calculate(arr);
        document.getElementById("result-display").innerHTML = `<strong> Sorted numbers: ${result} </strong>`; 
    });
});
 
let currentSortFunction = bubbleSortButton.id;
 
sortButton.forEach(button => {
    button.addEventListener("click", function() {
        currentSortFunction = button.id;
    });
});

 
 