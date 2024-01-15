import { Link } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe("Warning due RTL-DOM collision of version", () => {
    // Skip this test to not see the warning
    test("log a warning", async () => {
        const user = userEvent.setup();
        const RemixStub = createRemixStub([
            {
                path: "/new",
                id: "new",
                Component: () => {
                    return <Link to="/other">
                        Other
                    </Link>
                },
            },
            {
                path: "/other",
                id: "other",
                Component: () => {
                    return <div>other</div>
                }
            }
        ]);

        render(
            <RemixStub
              initialEntries={["/new"]}
            />,
          )

        await user.click(screen.getByRole("link", {
            name: "Other"
        }))

        expect(await screen.findByText("other")).toBeInTheDocument();

    });

    test("doesn't log a warning", async () => {
        const user = userEvent.setup();
        const RemixStub = createRemixStub([
            {
                path: "/new",
                id: "new",
                Component: () => {
                    return <Link to="/other">
                        Other
                    </Link>
                },
            },
            {
                path: "/other",
                id: "other",
                Component: () => {
                    return <div>other</div>
                }
            }
        ]);

        render(
            <RemixStub
              initialEntries={["/new"]}
            />,
          )

        user.click(screen.getByRole("link", {
            name: "Other"
        }))

        expect(await screen.findByText("other")).toBeInTheDocument();

    });

});
