import { NavigateList } from '../../components/navigate-list';
import { ProfileAvatarBlock } from '../../components/profile-avatar-block';
import { ProfileHistoryBlock } from '../../components/profile-history-block';
import { ProfileInformation } from '../../components/profile-information';
import { PROFILE_STATE_BLOCK } from '../../const/profile-history-block';

import styles from './profile.module.scss';

export const Profile = () => (
  <div className={styles.profile}>
    {/* <NavigateList /> */}
    <ProfileAvatarBlock />
    <ProfileInformation />
    {PROFILE_STATE_BLOCK.map(({ title, discription, areaText, id }) => (
      <ProfileHistoryBlock title={title} discription={discription} areaText={areaText} key={id} />
    ))}
  </div>
);
