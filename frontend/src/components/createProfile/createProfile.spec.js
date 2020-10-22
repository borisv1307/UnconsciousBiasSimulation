import React from "react";
import { shallow } from "enzyme";
import CreateProfile from "./createProfile";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
  const input = wrapper.find(inputSelector);
  input.simulate("change", {
    target: { value: newValue },
  });
  return wrapper.find(inputSelector);
};

describe("CreateProfile", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<CreateProfile />)));

  it("CreateProfile should include 3 forms for personal details, education and experience", () => {
    expect(wrapper.find("Form").length).toEqual(3);
  });

  it("CreateProfile should include an accordion", () => {
    expect(wrapper.find("Accordion").length).toEqual(1);
  });

  it("should include inputs for personal details, education, and experience", () => {
    expect(wrapper.find("#profileName").length).toEqual(1);
    expect(wrapper.find("#firstName").length).toEqual(1);
    expect(wrapper.find("#lastName").length).toEqual(1);
    expect(wrapper.find("#position").length).toEqual(1);
    expect(wrapper.find("#aboutMe").length).toEqual(1);
    expect(wrapper.find("#school").length).toEqual(1);
    expect(wrapper.find("#degree").length).toEqual(1);
    expect(wrapper.find("#major").length).toEqual(1);
    expect(wrapper.find("#eduStartDate").length).toEqual(1);
    expect(wrapper.find("#eduEndDate").length).toEqual(1);
    expect(wrapper.find("#gpa").length).toEqual(1);
    expect(wrapper.find("#title").length).toEqual(1);
    expect(wrapper.find("#company").length).toEqual(1);
    expect(wrapper.find("#location").length).toEqual(1);
    expect(wrapper.find("#expStartDate").length).toEqual(1);
    expect(wrapper.find("#expEndDate").length).toEqual(1);
  });

  it("update input forms ", () => {
    const profileNameInput = simulateChangeOnInput(wrapper, "#profileName", "Profile 1");
    const firstNameInput = simulateChangeOnInput(wrapper, "#firstName", "John");
    const lastNameInput = simulateChangeOnInput(wrapper, "#lastName", "Doe");
    const positionInput = simulateChangeOnInput(wrapper, "#position", "Worker");
    const aboutMeInput = simulateChangeOnInput(wrapper, "#aboutMe", "Good");
    const schoolInput = simulateChangeOnInput(
      wrapper,
      "#school",
      "Drexel University"
    );
    const degreeInput = simulateChangeOnInput(wrapper, "#degree", "BS");
    const majorInput = simulateChangeOnInput(wrapper, "#major", "Science");
    const eduStartDateInput = simulateChangeOnInput(
      wrapper,
      "#eduStartDate",
      "2020-09"
    );
    const eduEndDateInput = simulateChangeOnInput(
      wrapper,
      "#eduEndDate",
      "2020-09"
    );
    const gpaInput = simulateChangeOnInput(wrapper, "#gpa", "3.50");
    const titleInput = simulateChangeOnInput(wrapper, "#title", "Intern");
    const companyInput = simulateChangeOnInput(wrapper, "#company", "DXC");
    const locationInput = simulateChangeOnInput(
      wrapper,
      "#location",
      "Philadelphia"
    );
    const expStartDateInput = simulateChangeOnInput(
      wrapper,
      "#expStartDate",
      "2020-09"
    );
    const expEndDateInput = simulateChangeOnInput(
      wrapper,
      "#expEndDate",
      "2020-09"
    );
    
    expect(profileNameInput.props().value).toEqual("Profile 1");
    expect(firstNameInput.props().value).toEqual("John");
    expect(lastNameInput.props().value).toEqual("Doe");
    expect(positionInput.props().value).toEqual("Worker");
    expect(aboutMeInput.props().value).toEqual("Good");
    expect(schoolInput.props().value).toEqual("Drexel University");
    expect(degreeInput.props().value).toEqual("BS");
    expect(majorInput.props().value).toEqual("Science");
    expect(eduStartDateInput.props().value).toEqual("2020-09");
    expect(eduEndDateInput.props().value).toEqual("2020-09");
    expect(gpaInput.props().value).toEqual("3.50");
    expect(titleInput.props().value).toEqual("Intern");
    expect(companyInput.props().value).toEqual("DXC");
    expect(locationInput.props().value).toEqual("Philadelphia");
    expect(expStartDateInput.props().value).toEqual("2020-09");
    expect(expEndDateInput.props().value).toEqual("2020-09");
  });

  it("should include buttons for adding edu and exp", () => {
    const eduButton = wrapper.find("Button#addEducationButton");
    const expButton = wrapper.find("Button#addExperienceButton");

    expect(eduButton.length).toEqual(1);
    expect(expButton.length).toEqual(1);

    expect(eduButton.text()).toEqual("Add Education");
    expect(expButton.text()).toEqual("Add Experience");
  });

  it("should insert education details in education array when button is clicked", () => {
    const educationButton = wrapper.find("#addEducationButton")

    simulateChangeOnInput(wrapper, "#school", "Drexel University");
    simulateChangeOnInput(wrapper, "#degree", "BS");
    simulateChangeOnInput(wrapper, "#major", "Science");
    simulateChangeOnInput(wrapper, "#eduStartDate", "2020-09");
    simulateChangeOnInput(wrapper, "#eduEndDate", "2020-09");
    simulateChangeOnInput(wrapper, "#gpa", "3.50");

    educationButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("education")).toEqual([{"degree": "BS", "eduEndDate": "2020-09", "eduStartDate": "2020-09", "gpa": "3.50", "major": "Science", "school": "Drexel University"}]);
  });

  it("should insert multiple education details in education array when button is clicked multiple times", () => {
    const educationButton = wrapper.find("#addEducationButton")

    simulateChangeOnInput(wrapper, "#school", "Drexel University");
    simulateChangeOnInput(wrapper, "#degree", "BS");
    simulateChangeOnInput(wrapper, "#major", "Science");
    simulateChangeOnInput(wrapper, "#eduStartDate", "2020-09");
    simulateChangeOnInput(wrapper, "#eduEndDate", "2020-09");
    simulateChangeOnInput(wrapper, "#gpa", "3.50");

    educationButton.simulate('click');
    wrapper.update();
    educationButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("education")).toEqual([{"degree": "BS", "eduEndDate": "2020-09", "eduStartDate": "2020-09", "gpa": "3.50", "major": "Science", "school": "Drexel University"}, {"degree": "BS", "eduEndDate": "2020-09", "eduStartDate": "2020-09", "gpa": "3.50", "major": "Science", "school": "Drexel University"}]);
  });

  it("should insert experience details in experience array when button is clicked", () => {
    const experienceButton = wrapper.find("#addExperienceButton")

    simulateChangeOnInput(wrapper, "#title", "Intern");
    simulateChangeOnInput(wrapper, "#company", "DXC");
    simulateChangeOnInput(wrapper,"#location", "Philadelphia");
    simulateChangeOnInput(wrapper, "#expStartDate", "2020-09");
    simulateChangeOnInput(wrapper, "#expEndDate", "2020-09");

    experienceButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("experience")).toEqual([{"company": "DXC", "expEndDate": "2020-09", "expStartDate": "2020-09", "location": "Philadelphia", "title": "Intern"}]);
  });

  it("should insert multiple experience details in experience array when button is clicked multiple times", () => {
    const experienceButton = wrapper.find("#addExperienceButton")

    simulateChangeOnInput(wrapper, "#title", "Intern");
    simulateChangeOnInput(wrapper, "#company", "DXC");
    simulateChangeOnInput(wrapper, "#location", "Philadelphia");
    simulateChangeOnInput(wrapper, "#expStartDate",  "2020-09");
    simulateChangeOnInput(wrapper, "#expEndDate", "2020-09");

    experienceButton.simulate('click');
    wrapper.update();
    experienceButton.simulate('click');
    wrapper.update();
    expect(wrapper.state("experience")).toEqual([{"company": "DXC", "expEndDate": "2020-09", "expStartDate": "2020-09", "location": "Philadelphia", "title": "Intern"},{"company": "DXC", "expEndDate": "2020-09", "expStartDate": "2020-09", "location": "Philadelphia", "title": "Intern"}]);
  });

  describe("UploadImage", () => {
    beforeEach(() => (wrapper = shallow(<CreateProfile />)));

    it("should have a button for uploading an image", () =>{
        expect(wrapper.find("input#UploadImageInput").length).toEqual(1);
    });

    it("should render an image", () => {
        expect(wrapper.find("img#profileImage").length).toEqual(1);
    });

    it("should display generic avatar picture when no image is uploaded yet", () => {
        const imgInput = wrapper.find("img#profileImage");
        expect(imgInput.getElement(0).props.src).toEqual("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
    });
  });

});
