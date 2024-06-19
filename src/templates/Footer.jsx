import React from "react";
import ApplicationLogo from "../components/ApplicationLogo";
import Copyright from "../components/Copyright";
import Link from "../components/Link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center text-white bg-black">
      <div className="w-full h-fit">
        <div className="flex flex-row items-top justify-around gap-20 p-9 w-screen h-fit relative bottom-0">
          <div className="w-[60%] flex flex-col gap-4">
            <ApplicationLogo color="dark" />
            <div>
              Trustify is your go-to platform for verifying the authenticity of
              information. Our community-driven approach helps ensure you get
              the facts, not fiction.
            </div>
            <div>
              Do incididunt laboris id deserunt ullamco sint ullamco
              reprehenderit sint deserunt et amet veniam consequat.
            </div>
            <div>
              Do incididunt laboris id deserunt ullamco sint ullamco
              reprehenderit sint deserunt et amet veniam consequat.
            </div>
          </div>
          <div className="w-[40%] flex flex-row">
            <div className="w-full my-11">
              <div className="font-bold text-xl mb-10">Quick links</div>
              <div className="flex flex-col gap-2">
                <Link href="/" text="About Us" />
                <Link href="/" text="Contact Us" />
                <Link href="/" text="Privacy Policy" />
                <Link href="/" text="Terms of Service" />
              </div>
            </div>
            <div className="w-full my-11">
              <div className="font-bold text-xl mb-10">Follow Us</div>
              <div className="flex flex-col gap-3">
                {/* Facebook */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  fill="none"
                  viewBox="0 0 48 49"
                >
                  <path
                    fill="#fefae0"
                    d="M48 24.377c0-13.255-10.745-24-24-24s-24 10.745-24 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094v-6.938h6.094v-5.288c0-6.015 3.583-9.337 9.065-9.337 2.625 0 5.372.468 5.372.468v5.907h-3.026c-2.981 0-3.911 1.85-3.911 3.75v4.5h6.656l-1.064 6.937H27.75v16.771C39.224 46.285 48 36.355 48 24.377Z"
                  />
                </svg>

                {/* Twitter/X */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  fill="none"
                  viewBox="0 0 48 49"
                >
                  <path
                    fill="#fefae0"
                    d="M15.095 43.878c18.113 0 28.02-15.007 28.02-28.02 0-.427 0-.851-.028-1.274A20.035 20.035 0 0 0 48 9.488a19.63 19.63 0 0 1-5.656 1.55 9.88 9.88 0 0 0 4.33-5.448 19.73 19.73 0 0 1-6.254 2.39 9.857 9.857 0 0 0-16.783 8.983A27.961 27.961 0 0 1 3.341 6.672 9.855 9.855 0 0 0 6.39 19.82a9.762 9.762 0 0 1-4.47-1.233v.125a9.852 9.852 0 0 0 7.9 9.653 9.829 9.829 0 0 1-4.446.17 9.861 9.861 0 0 0 9.2 6.838A19.757 19.757 0 0 1 0 39.454a27.883 27.883 0 0 0 15.095 4.416"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  fill="none"
                  viewBox="0 0 48 49"
                >
                  <g clipPath="url(#a)">
                    <path
                      fill="#fefae0"
                      d="M24 4.699c6.413 0 7.172.028 9.694.14 2.343.103 3.61.497 4.453.825 1.116.431 1.922.956 2.756 1.79.844.845 1.36 1.641 1.79 2.757.329.844.723 2.119.826 4.453.112 2.531.14 3.29.14 9.694 0 6.412-.028 7.172-.14 9.694-.103 2.343-.497 3.61-.825 4.453-.431 1.115-.957 1.922-1.79 2.756-.845.844-1.642 1.36-2.757 1.79-.844.329-2.119.723-4.453.826-2.532.112-3.29.14-9.694.14-6.413 0-7.172-.028-9.694-.14-2.343-.103-3.61-.497-4.453-.825-1.115-.431-1.922-.956-2.756-1.79-.844-.845-1.36-1.642-1.79-2.757-.329-.844-.723-2.119-.826-4.453-.112-2.532-.14-3.29-.14-9.694 0-6.413.028-7.172.14-9.694.103-2.344.497-3.61.825-4.453.431-1.116.957-1.922 1.79-2.756.845-.844 1.642-1.36 2.757-1.79.844-.329 2.119-.723 4.453-.826 2.522-.112 3.281-.14 9.694-.14Zm0-4.322c-6.516 0-7.331.028-9.89.14-2.55.113-4.304.525-5.822 1.116-1.585.619-2.926 1.434-4.257 2.775-1.34 1.331-2.156 2.672-2.775 4.247-.59 1.528-1.003 3.272-1.115 5.822C.028 17.046 0 17.86 0 24.377c0 6.515.028 7.331.14 9.89.113 2.55.526 4.303 1.116 5.822.619 1.585 1.435 2.925 2.775 4.257a11.732 11.732 0 0 0 4.247 2.765c1.528.59 3.272 1.003 5.822 1.116 2.56.112 3.375.14 9.89.14 6.516 0 7.332-.028 9.891-.14 2.55-.113 4.303-.525 5.822-1.116a11.732 11.732 0 0 0 4.247-2.765 11.732 11.732 0 0 0 2.766-4.247c.59-1.528 1.003-3.272 1.115-5.822.113-2.56.14-3.375.14-9.89 0-6.517-.027-7.332-.14-9.892-.112-2.55-.525-4.303-1.115-5.821-.591-1.594-1.407-2.935-2.747-4.266a11.732 11.732 0 0 0-4.247-2.766C38.194 1.052 36.45.64 33.9.527c-2.569-.122-3.384-.15-9.9-.15Z"
                    />
                    <path
                      fill="#fefae0"
                      d="M24 12.049c-6.806 0-12.328 5.521-12.328 12.328 0 6.806 5.522 12.328 12.328 12.328 6.806 0 12.328-5.522 12.328-12.328 0-6.806-5.522-12.328-12.328-12.328Zm0 20.325a7.998 7.998 0 0 1 0-15.994 7.998 7.998 0 0 1 0 15.994Zm15.694-20.813a2.879 2.879 0 1 1-2.878-2.878 2.885 2.885 0 0 1 2.878 2.878Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fefae0" d="M0 .377h48v48H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
}
