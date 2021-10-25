import marked from "../static/js/marked.js";

const renderMarkdown = (markdown) => marked(markdown);

const handleMessage = ({ data }) => {
  const html = renderMarkdown(data);
  postMessage(html);
};

onmessage = handleMessage;
