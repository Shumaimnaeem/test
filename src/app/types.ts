export type product = {
    id : number,
    title : string,
    description : string
}

export type Query = {
    getAllProducts : product[];
}