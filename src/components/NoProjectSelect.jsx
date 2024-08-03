import PropTypes from "prop-types";

import noProjectImage from "../assets/no-projects.png";
import Button from "./Button";

export default function NoProjectSelect({ onStartAddProject }) {
  return (
    <div className="mt-25 text-center w-2/3">
      <img
        src={noProjectImage}
        alt="작업 리스트"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        프로젝트가 없습니다.
      </h2>
      <p className="text-stone-400 mb-4">
        프로젝트를 선택하거나 새로운 프로젝트를 시작하세요
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>프로젝트 새로 만들기</Button>
      </p>
    </div>
  );
}

NoProjectSelect.propTypes = {
  onStartAddProject: PropTypes.func.isRequired,
};
