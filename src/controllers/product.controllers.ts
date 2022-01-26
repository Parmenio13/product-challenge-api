import { Request, Response } from 'express';
import Products, { IProducts } from '../models/Products';

export const reviewAll = (req: Request, res: Response) => {
    Products.find({}, function (err, docs) {
        if (!err) {
            res.send(docs);
            process.exit();
        }
        else {
            throw err;
        }
    });
};
export const review = async (req: Request, res: Response) => {
    let idProd: string = req.params.id;
    const product = await Products.findOne({ productId: idProd });
    if (!product) return res.status(400).json("Product not found");
    res.send(product);
};

export const create = async (req: Request, res: Response) => {
    console.log('create product= ' + req.body.productId);
    let idProd: string = req.params.id;
    const newProduct: IProducts = new Products({
        productId: req.body.productId,
        averageReviewScore: req.body.averageReviewScore,
        numberOfReviews: req.body.numberOfReviews
    });
    const product = await Products.findOne({ productId: idProd });
    if (!product) {
        const savedProduct = await newProduct.save({}, function (err, docs) {
            if (!err) {
                res.send(docs);
                process.exit();
            }
            else {
                return res.status(400).json("Product already exist");
                throw err;
            }
        });
    } else {
        return res.status(400).json("Product already exist");
    }
};
export const update = async (req: Request, res: Response) => {
    console.log('update productId= ' + req.body.productId);
    let idProd: string = req.body.productId;
    const product = await Products.findOneAndUpdate({ productId: idProd }, req.body);
    if (!product) return res.status(400).json("Product not updated");
    const newProduct = await Products.findOne({ productId: idProd });
    res.send(newProduct);
}
export const deleteprod = async (req: Request, res: Response) => {
    console.log('deleteprod req.body.productId= ' + req.body.productId);
    let idProd: string = req.body.productId;
    const product = await Products.findOneAndDelete({ productId: idProd });
    if (!product) return res.status(400).json("Product not deleted");
    res.send(`Product deleted succesfully productId: ${idProd}`);
};

