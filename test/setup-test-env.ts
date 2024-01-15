import { installGlobals } from "@remix-run/node";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import dotenv from "dotenv";
dotenv.config();

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

installGlobals();
