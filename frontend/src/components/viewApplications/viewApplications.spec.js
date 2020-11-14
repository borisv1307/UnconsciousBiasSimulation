import React from "react";
import { shallow } from "enzyme";
import viewApplications from "./viewApplications";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("viewApplications", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<viewApplications />)));

  it("viewApplications should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
