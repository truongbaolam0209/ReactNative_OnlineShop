

export const transformDocs = (docs) => {
    let dataArr = [];
    for (let doc of docs) {
        let data = doc.data();
        data.id = doc.id;
        dataArr.push(data);
    };
    return dataArr;
};


export const transformDoc = (doc) => {
    let data = doc.data();
    data.id = doc.id;
    return data;
};