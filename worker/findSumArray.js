var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
onmessage = function (e) {
    return __awaiter(this, void 0, void 0, function () {
        var recieve, candidates, target, filterCandidates, maxLength, result, filterResult, finallyResult, i, JSONItem;
        return __generator(this, function (_a) {
            recieve = e.data;
            candidates = recieve.candidates;
            target = recieve.target;
            filterCandidates = __spread(new Set(candidates)).sort(function (a, b) { return a - b; });
            maxLength = Math.floor(target / Math.min.apply(Math, __spread(filterCandidates)));
            console.log('maxLength', maxLength);
            result = handleFunction(candidates, target, 1, maxLength);
            filterResult = [];
            finallyResult = [];
            if (result) {
                for (i = 0; i < result.length; i++) {
                    JSONItem = JSON.stringify(result[i].sort(function (a, b) { return a - b; }));
                    if (filterResult.includes(JSONItem)) {
                        continue;
                    }
                    filterResult.push(JSONItem);
                }
                finallyResult = filterResult.map(function (item) { return JSON.parse(item); });
            }
            console.log('result', finallyResult);
            postMessage(finallyResult);
            return [2 /*return*/];
        });
    });
};
function handleFunction(candidates, target, nowDeep, maxDeep) {
    if (nowDeep > maxDeep) {
        return null;
    }
    var returnArray = [];
    for (var i = 0; i < candidates.length; i++) {
        if (candidates[i] === target) {
            returnArray.push([candidates[i]]);
        }
        else {
            var newTarget = target - candidates[i];
            if (newTarget < 0) {
                continue;
            }
            var newResult = handleFunction(candidates, newTarget, nowDeep + 1, maxDeep);
            if (!newResult) {
                continue;
            }
            for (var j = 0; j < newResult.length; j++) {
                var tempArray = __spread([candidates[i]], newResult[j]);
                returnArray.push(tempArray);
            }
        }
    }
    return returnArray;
}
