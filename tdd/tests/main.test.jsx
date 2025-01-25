import { it, expect, describe } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { convert } from "../libs/currency";
import App from "../src/App";

describe("UI Test", () => {
    render(<App />);

    it("should render the app", () => {
        expect(screen.getByRole("title")).toBeInTheDocument();
    });

    it("should show correct result", async () => {
        await fireEvent.change(screen.getByRole("input"), {
            target: { value: "1.5" }
        });

        await fireEvent.click(screen.getByRole("button"));

        expect(screen.getByRole("result")).toHaveTextContent("6007.8");
    });
});

describe("Libs Test", () => {
    it("should be 4005.2", () => {
		expect(convert(1)).toBe(4005.2);
	});

	it("should be 6007.8", () => {
		expect(convert(1.5)).toBe(6007.8);
	});
});
