"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
// рандомное время от 1 секунды до 10 минут
function generateTime() {
    var min = 1000;
    var max = 1000 * 60 * 10;
    return Math.floor(Math.random() * (max) + 1) - min;
}
exports.users = Array.from({ length: 2000 }, function (_, index) { return ({
    color: Math.floor(Math.random() * (3) + 1) - 1,
    name: 'Вадим Кравцов',
    speed: Math.floor(Math.random() * (101) + 1) - 1,
    time: generateTime()
}); });
