export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
    name: string,
    value: string,
    props: { [key: string]: string | number | Date | boolean } = {}
): void {
    console.log(props);
    props = {
        path: "/",
        ...props,
    };

    let exp = props.expires;
    if (typeof exp === "number" && exp) {
        exp = new Date(new Date().getTime() + exp * 1000);
        props.expires = exp;
    }
    if (exp instanceof Date) {
        props.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;
    for (const propName in props) {
        updatedCookie += "; " + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, "", {
        "max-age": -1,
    });
}
