import { Link } from "react-router-dom";
import styles from "./CurriculumSection.module.css";
import Timeline from "./Timeline";

const CurriculumSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>커리큘럼</h2>
        <p className={styles.desc}>
          함께 배우고 만들어가는 <span className={styles.bold}>과정</span>을 소개합니다.
          <br />
          온보딩부터 팀 프로젝트와 데모데이까지, 만들면서 배우는 실전 중심의 커리큘럼을 제공합니다.
        </p>

        <Timeline />

        <div className={styles.btnRow}>
          <Link to="/activities" className={styles.primaryBtn}>
            상세 활동 확인하러 가기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
