import styles from "./ProjectSection.module.css";
import ProjectCard from "./ProjectCard";
import wayto1 from "../../../assets/images/wayto1.png";
import wayto2 from "../../../assets/images/wayto2.png"; 
import looktoday1 from "../../../assets/images/looktoday1.png";
import looktoday2 from "../../../assets/images/looktoday2.png";

const ProjectSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>프로젝트</h2>
        <p className={styles.desc}>
          배움이 머무르지 않고, 결과로 이어진 순간을 기록합니다.
          <br />전 기수의 팀원들이 협업하여 직접 기획하고 개발한{" "}
          <span className={styles.bold}>결과물</span>입니다.
        </p>

        <div className={styles.grid}>
          <ProjectCard
            title="웨이투회의"
            subtitle="회의가 새로워지는 길, 웨이투회의"
            desc="회의 일정부터 팀 관리까지 한 번에 해결하는 올인원 회의 관리 서비스"
            badge="NEW"
            thumbnails={[wayto1, wayto2]}
          />
          <ProjectCard
            title="룩투데이"
            subtitle="매일의 룩이 이야기가 되는 곳, 룩투데이"
            desc="위치 기반 날씨 정보를 바탕으로 오늘의 코디를 추천하고 기록하는 패션 플랫폼"
            badge="NEW"
            thumbnails={[looktoday1, looktoday2]}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
