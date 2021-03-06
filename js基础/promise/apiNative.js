//传入一个带promise方法的数组，数组内的方法全部执行成功才返回事件
Promise.all = function (list) {
    if (!Array.isArray(list)) {
        throw Error("arguments must be array");
        return;
    }
    return new Promise((resolve, reject) => {
        let len = list.length, resArr = [],count=0;
        for (let i = 0; i < list.length; i++){
            //使用Promise.resolve是为了预防部分数组元素不是promise对象
            Promise.resolve(list[i]).then((data) => {
                //使用resArr[i]赋值是因为数据的回调顺序可能不一样，为保证返回值顺序一致
                resArr[i] = data;
                count++;
                if (count == len) {
                    resolve(resArr);
                }
            }).catch(e => {
                reject(e);
            })
        }
    })
}
//传入一个带promise方法的数组，数组内的方法全部执行（不管失败与否）返回事件
Promise.allSetter = function (list) {
    if (!Array.isArray(list)) {
        throw Error("arguments must be array");
        return;
    }
    return new Promise((resolve, reject) => {
        let len = list.length, resArr = [],count=0;
        for (let i = 0; i < list.length; i++){
            list[i].then((data) => {
                resArr[i] = data;
            },e => {
                resArr[i] = e;
            }).finally(() => {
                if (count == len) {
                    resolve(resArr);
                }
            })
        }
    })
}

Promise.finally = function (callback) {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => {
            return value;
        });
    }, (err) => {
        return Promise.resolve(callback()).then(() => {
            throw err;
        });
    });
}