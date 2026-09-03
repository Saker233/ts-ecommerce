import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { BadRequestsException } from "../exceptions/bad-requests.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";
import { createProductSchema, updateProductSchema } from "../schema/products.js";

const parseId = (raw: string | string[] | undefined) => {
    const value = Array.isArray(raw) ? raw[0] : raw
    const id = Number(value)
    if (!Number.isInteger(id) || id <= 0) {
        throw new BadRequestsException("Invalid product id", ErrorCode.VALIDATION_ERROR)
    }
    return id
}

const findProductOrThrow = async (id: number) => {
    const product = await prisma.product.findFirst({ where: { id } })
    if (!product) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
    return product
}

export const createProduct = async (req: Request, res: Response) => {
    const { tags, ...data } = createProductSchema.parse(req.body)

    const product = await prisma.product.create({
        data: {
            ...data,
            tags: tags.join(","),
        },
    })

    res.status(201).json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
    const id = parseId(req.params.id)
    const { tags, ...data } = updateProductSchema.parse(req.body)

    await findProductOrThrow(id)

    const product = await prisma.product.update({
        where: { id },
        data: {
            ...data,
            ...(tags !== undefined ? { tags: tags.join(",") } : {}),
        },
    })

    res.json(product)
}

export const deleteProduct = async (req: Request, res: Response) => {
    const id = parseId(req.params.id)

    await findProductOrThrow(id)

    const product = await prisma.product.delete({ where: { id } })

    res.json({ message: "Product deleted successfully", product })
}

export const listProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    })

    res.json(products)
}

export const getProductById = async (req: Request, res: Response) => {
    const id = parseId(req.params.id)
    const product = await findProductOrThrow(id)

    res.json(product)
}
