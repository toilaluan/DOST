const api_key = "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"
const prompts = {
    system: "you are an document helper. you read a text and answer user question",
    gen_prompt: "generate summary and tags, return as a json with format: {summary: text, tags: text}",
}

module.exports = {api_key, prompts}