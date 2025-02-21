const BUFFER_TIME = 500;

export const donate = () => {
    (
        document.evaluate(
            "/html/body/div[2]/div[2]/div[2]/section[2]/div/div/div/div/div[1]/div[2]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
        ).singleNodeValue as HTMLElement
    ).click();

    setTimeout(() => {
        const select = document.getElementById(
            "fundsTransferToList",
        ) as HTMLSelectElement;
        select.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        const optionToClick = [...select.options].find(
            (opt) => opt.value === "Student",
        );
        if (optionToClick) {
            select.value = optionToClick.value;
            select.dispatchEvent(new Event("input", { bubbles: true }));
            select.dispatchEvent(
                new Event("change", {
                    bubbles: true,
                }),
            );
        }

        setTimeout(() => {
            (
                document.getElementById(
                    "transfer-amount-textBox",
                ) as HTMLInputElement
            ).value = "10";
            (
                document.getElementById(
                    "transfer-recipientStudentEmail-textBox",
                ) as HTMLInputElement
            ).value = "wangnea@psd267.org";
            (
                document.getElementById(
                    "student-money-transfer-memo-textBox",
                ) as HTMLInputElement
            ).value = "Snake game";
            (
                document.evaluate(
                    "/html/body/div[2]/div[2]/div[2]/section[2]/div/div/div/div/div[2]/div[2]/div[1]/div[6]/button",
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null,
                ).singleNodeValue as HTMLElement
            ).click();

            alert("Thanks for playing!");
        }, BUFFER_TIME);
    }, BUFFER_TIME);
};
