/**
 * Renders an error page.
 * @param {{
 *   baseUrl: string
 *   basePath: string
 *   error?: string
 *   res: import("src/lib/types").NextAuthResponse
 * }} params
 */
export default function Error({ baseUrl, basePath, error = "default", theme, res }) {
  const signinPageUrl = `${baseUrl}${basePath}/signin`

  const errors = {
    default: {
      statusCode: 200,
      heading: "Error",
      message: (
        <p>
          <a className="site" href={baseUrl}>
            {baseUrl.replace(/^https?:\/\//, "")}
          </a>
        </p>
      ),
    },
    configuration: {
      statusCode: 500,
      heading: "Server error",
      message: (
        <div>
          <p>There is a problem with the server configuration.</p>
          <p>Check the server logs for more information.</p>
        </div>
      ),
    },
    accessdenied: {
      statusCode: 403,
      heading: "Access Denied",
      message: (
        <div>
          <p>You do not have permission to sign in.</p>
          <p>
            <a className="button" href={signinPageUrl}>
              Sign in
            </a>
          </p>
        </div>
      ),
    },
    verification: {
      statusCode: 403,
      heading: "Unable to sign in",
      message: (
        <div>
          <p>The sign in link is no longer valid.</p>
          <p>It may have been used already or it may have expired.</p>
        </div>
      ),
      signin: (
        <p>
          <a className="button" href={signinPageUrl}>
            Sign in
          </a>
        </p>
      ),
    },
  }

  const { statusCode, heading, message, signin } =
    errors[error.toLowerCase()] ?? errors.default

  res.status(statusCode)

  return (
    <div className="error">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `}} />
      {theme.logo && (
        <img src={theme.logo} alt="Logo" className="logo" />
      )}
      <div className="card">
        <h1>{heading}</h1>
        <div className="message">{message}</div>
        {signin}
      </div>
    </div>
  )
}