const api_key = "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"
const prompts = {
    system: "you are an document helper. you read a text and answer user question",
    gen_prompt: "generate summary and tags, return as a json with format: {summary: text, tags: text}",
}

module.exports = {api_key, prompts}