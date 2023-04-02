import RegistrationForm from "../components/RegistrationForm";

export default function Homepage() {
  return (
    <div className="container">
      <h1>Baton Rouge Slack</h1>
      <p>
        The{" "}
        <a href="https://batonrouge.slack.com" rel="noopener">
          Baton Rouge Slack
        </a>{" "}
        is community for Baton Rouge area developers, designers, marketers,
        business people, hobbyists, students, entrepreneurs, and other
        professionals involved in technology.
      </p>

      <div className="row">
        <div className="columns columns-md-6">
          <h2>How do I join?</h2>
          <p>
            The Slack is invitation-only, but invitations are freely granted.
            You can request one by filling out this form:{" "}
          </p>
          <RegistrationForm />
        </div>
        <div className="columns columns-md-6">
          <h2>Who's invited?</h2>
          <p>
            Anybody who lives in Baton Rouge or the surrounding area and has an
            interest in technology is welcome to join! You don't need to be a
            developer, designer, or even work in the tech industry; you just
            need to bring your interest and your passions.
          </p>

          <h2>I want to bring a friend!</h2>
          <p>
            If you know someone who wants to join the Slack, please direct them
            to this page and ask them to submit the invite request; it's the
            fastest way to get them their invite!
          </p>

          <h2>Channels</h2>
          <p>
            Slack chat spaces are divided into rooms called "channels", and we
            have a few. There are three you'll be in by default:
          </p>
          <ul>
            <li>
              <span className="channel-name">#announcements</span>: occasional
              announcements
            </li>
            <li>
              <span className="channel-name">#chat</span>: random chat
            </li>
            <li>
              <span className="channel-name">#introductions</span>: introduce
              yourself!
            </li>
          </ul>
          <p>
            All rooms are opt-in except #announcements, which is why it is kept
            low-volume.
          </p>

          <h2>What are the rules?</h2>
          <p>
            We have a simple <a href="/code-of-conduct/">Code of Conduct</a>{" "}
            that is based on the same Code of Conduct used by projects such as{" "}
            <a href="https://github.com/angular/code-of-conduct" rel="noopener">
              AngularJS
            </a>
            ,{" "}
            <a
              href="https://dotnetfoundation.org/code-of-conduct"
              rel="noopener"
            >
              The .NET Foundation
            </a>
            ,
            <a href="http://rubyonrails.org/conduct/" rel="noopener">
              Rails
            </a>
            , and{" "}
            <a
              href="https://swift.org/community/#code-of-conduct"
              rel="noopener"
            >
              Swift
            </a>
            .
          </p>

          <h2>Community Guidelines</h2>
          <p>
            In order to help newcomers understand both Slack and our community a
            bit more, we've documented some basic tips and tricks in our{" "}
            <a href="/community-guidelines/">Community Guidelines</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
