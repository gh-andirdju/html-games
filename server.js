const port = Number(process.env.PORT || 8000);
const rawBasePath = process.env.BASE_PATH || "/";
const normalizedBasePath = rawBasePath === "/"
  ? "/"
  : `/${rawBasePath.replace(/^\/+|\/+$/g, "")}/`;

const mimeTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript"
};

function normalizeRequestPath(urlPathname) {
  if (normalizedBasePath !== "/") {
    if (urlPathname === normalizedBasePath.slice(0, -1)) {
      return { redirect: normalizedBasePath };
    }

    if (!urlPathname.startsWith(normalizedBasePath)) {
      return { notFound: true };
    }

    urlPathname = `/${urlPathname.slice(normalizedBasePath.length)}`;
  }

  if (urlPathname === "/") {
    return { pathname: "/index.html" };
  }

  if (urlPathname.endsWith("/")) {
    return { pathname: `${urlPathname}index.html` };
  }

  return { pathname: urlPathname };
}

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const resolved = normalizeRequestPath(url.pathname);

    if (resolved.redirect) {
      return Response.redirect(resolved.redirect, 308);
    }

    if (resolved.notFound || !resolved.pathname) {
      return new Response("Not found", { status: 404 });
    }

    const file = Bun.file(`.${resolved.pathname}`);
    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 });
    }

    const extension = resolved.pathname.slice(resolved.pathname.lastIndexOf("."));
    return new Response(file, {
      headers: {
        "Content-Type": mimeTypes[extension] || "application/octet-stream"
      }
    });
  }
});

console.log(`HTML Games running at http://127.0.0.1:${port}${normalizedBasePath}`);
