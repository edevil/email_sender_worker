import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default {
  async fetch(request, env) {
    const msg = createMimeMessage();
    msg.setSender({ name: "GPT-4", addr: "something@email.speedcf.com" });
    msg.setRecipient("teste@cabine.org");
    msg.setSubject("An email generated in a worker");
    msg.setMessage(
      "text/plain",
      `Congratulations, you just sent an email from a worker.

good bye.`
    );

    var message = new EmailMessage(
      "something@email.speedcf.com",
      "teste@cabine.org",
      msg.asRaw()
    );
    try {
      await env.SEB.send(message);
    } catch (e) {
      return new Response(e.message);
    }

    return new Response("Hello Send Email World!");
  },
};
