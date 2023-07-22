import { after, before } from "node:test";
import { createApp } from "../app";
import { Application } from "express";
import * as http from "http"
import { App } from "../app";
import { AppDataSource } from "../database";

let app : App

beforeAll(async () => {
    await AppDataSource.initialize()
})

test("Testing jest setup", () => {
    expect(true).toBe(true)
})