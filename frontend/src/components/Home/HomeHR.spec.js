import React from "react";
import { shallow } from "enzyme";
import HomeHR from "./HomeHR";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("HomeHR", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<HomeHR />)));
  it("Home HR page should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have a Navbar", () => {
    expect(wrapper.find("Navbar").length).toEqual(1);
  });
});
