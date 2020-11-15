import React from "react";
import { shallow } from "enzyme";
import ViewApplications from "./viewApplications";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("ViewApplications", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<ViewApplications />)));

  it("viewApplications should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
