import * as cheerio from "cheerio";
import { parseArgs } from "util";


const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    file: {
      type: 'string',
    }
  },
  allowPositionals: false,
})

if (!values.file) {
  process.exit(1);
}
const htmlFile = Bun.file(values.file);

const selector = cheerio.load(await htmlFile.text());

const titles = selector("h3")

titles.each((i, el) => {
  console.log(selector(el).text())
})

const nodes = selector("dt").has("h3");

nodes.each((i, el) => {
  console.log("*************");
  const title = selector("h3", el);
  console.log(title.text());
  console.log("*************");
  selector("a", el).each((j, a) => {
    const link = selector(a);
    console.log(`[${link.text()}](${link.attr("href")})`);
  })
  console.log();
})


