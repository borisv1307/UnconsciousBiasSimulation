import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UploadImage from "./uploadImage";

configure({ adapter: new Adapter() });



describe("UploadImage", () => {
    let wrapper;
    beforeEach(() => (wrapper = shallow(<UploadImage />)));

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