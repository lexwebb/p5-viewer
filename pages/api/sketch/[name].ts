import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

/// https://blog.logrocket.com/implementing-websocket-communication-next-js/

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { name },
  } = req;

  const script = fs.readFileSync(`${process.env.P5_DIR}/${name}`);

  res.status(200).send(`
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
        <script>
            ${script}
        </script>
    </head>
    <body>
        <main>
        </main>
    </body>
</html>`);
}
