import { submit } from "./actions";
import Captcha from "../hCaptcha";

export default function RegistrationForm() {
  return (
    <form id="request-invite-form" action={submit} method="post">
      <label>
        <span>First Name: </span>
        <input name="first_name" required type="text" />
      </label>
      <label>
        <span>Last Name: </span>
        <input name="last_name" required type="text" />
      </label>
      <label>
        <span>Email: </span>
        <input name="email" required type="email" />
      </label>
      <label>
        <span>Twitter (optional): </span>
        <input name="twitter" type="text" />
      </label>
      <label>
        <span>GitHub (optional): </span>
        <input name="github" type="text" />
      </label>
      <label>
        <span>About You (optional)</span>
      </label>
      <textarea
        aria-label="About You (optional)"
        name="bio"
        placeholder="Tell us a bit about yourself! Anything or nothing is fine!"
      ></textarea>
      <label>
        <span>&nbsp;</span>
        <input type="checkbox" name="lives_near_baton_rouge" required /> I live
        in Baton Rouge or the surrounding area
      </label>
      <label>
        <span>&nbsp;</span>
        <input type="checkbox" name="coc" required /> I agree to the{" "}
        <a href="/code-of-conduct" target="_blank" rel="noopener">
          Code of Conduct
        </a>
      </label>
      <Captcha />
      <label>
        <span>&nbsp;</span>
        <button type="submit">Request Invite</button>
      </label>
    </form>
  );
}
