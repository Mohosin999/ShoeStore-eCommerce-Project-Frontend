import React from "react";
import Wrapper from "../components/wrapper";

/**
 * Contact page
 * @returns {JSX.Element}
 */
const ContactPage = () => {
  return (
    <Wrapper>
      <section className="mt-32">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-200 ">
          Contact Us
        </h2>
        <p className="mb-2 font-light text-center text-gray-400 text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 text-xl">
          <span className="text-yellow-400 text-2xl">[Note]: </span>This section
          is not implemented.
        </p>
        <form action="#" className="space-y-4 w-[70%] mx-auto">
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label
              for="subject"
              className="block mb-2 text-base font-medium text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              for="message"
              className="block mb-2 text-base font-medium text-gray-300"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-full bg-green-600 hover:bg-green-700"
          >
            Send message
          </button>
        </form>
      </section>
    </Wrapper>
  );
};

export default ContactPage;
