import { Router } from "express";

export interface Controller {
    router: Router
}

export * from "./FilesController";
export * from "./ConfigController";