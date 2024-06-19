import React from "react";
import {
  Button,
  Card,
  Datepicker,
  Label,
  Radio,
  TextInput,
} from "flowbite-react";
import ApplicationLogo from "../components/ApplicationLogo";
import Link from "../components/Link";
import Footer from "../templates/Footer";

export default function SignUp() {
  return (
    <div>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <ApplicationLogo />
        <div className="w-fit">
          <Card className="bg-gray-200 border-gray-300 rounded-2xl">
            <div className="text-xl font-bold"> Sign Up</div>
            <form className="w-96 flex flex-col gap-4">
              <Link
                className="text-blue-500 underline italic text-xs font-normal hover:text-blue-500"
                text="Already have an account? Sign in here."
                href="/log"
              />

              <div>
                <Label>Name</Label>
                <TextInput name="name" />
              </div>

              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label>Birthdate</Label>
                  <Datepicker name="birthdate" />
                </div>
                <div className="flex flex-col mt-6 w-32">
                  <div>
                    <Radio name="gender" value="male"></Radio>
                    <Label className="ml-4">Male</Label>
                  </div>
                  <div>
                    <Radio name="gender" value="female"></Radio>
                    <Label className="ml-4">Female</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <TextInput name="email" />
              </div>

              <div>
                <Label>Password</Label>
                <TextInput name="password" />
              </div>

              <Button color="dark">Sign Up</Button>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
