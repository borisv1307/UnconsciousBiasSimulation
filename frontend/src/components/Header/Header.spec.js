import Header from "./Header";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Header", () => {
  it("Header should exist", () => {
    const links = [
      { link: "http://localhost:3000/home", text: "Home" },
      { link: "http://localhost:3000/createProfile", text: "Create Profile" },
      { link: "http://localhost:3000/viewProfile", text: "View Profile" },
    ];
    const wrapper = shallow(<Header links={links} />);
    expect(wrapper.exists()).toBe(true);
  });
});
