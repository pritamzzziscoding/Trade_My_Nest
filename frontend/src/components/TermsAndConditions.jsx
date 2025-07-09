export const TermsAndConditions = () => {
  return (
    <div className="max-w-xl mx-auto prose prose-sm text-gray-600 py-5 px-3 overflow-auto h-[65vh]">
      <h1 className="text-2xl font-bold text-center mb-4">Terms and Conditions</h1>
      <ol className="space-y-4 list-decimal pl-5">
        <li>
          <strong>Purpose of the Website:</strong>
          This website is not intended to facilitate room allocation or guarantee mess exchange. It is solely designed to help male students exchange hostel rooms within the college, where rooms are allocated randomly.
        </li>
        <li>
          <strong>College Email Requirement:</strong>
          Only students with a valid college email address may use this website. This ensures that no outsiders can access or use the platform.
        </li>
        <li>
          <strong>Room Exchange Process:</strong>
          Any room exchange must be based on mutual discussion and agreement between the involved parties. The website only acts as a platform for connecting students.
        </li>
        <li>
          <strong>Eligibility:</strong>
          This website is exclusively for male students of the college.
        </li>
        <li>
          <strong>Posting Requests:</strong>
          Each user is allowed to post only one room exchange request at a time. Users may update or delete their request as needed.
        </li>
        <li>
          <strong>Request Management:</strong>
          If a user successfully exchanges their room, it is appreciated if they promptly delete their request from the website.
        </li>
        <li>
          <strong>Notification Limit:</strong>
          Users may notify another user of their interest in a room exchange only once every 24 hours.
        </li>
      </ol>
      <p className="mt-4">
        By using this website, you agree to abide by these terms and conditions. If you have any questions, please contact support.
      </p>
    </div>
  );
};

