import css from '../../../styles/css/components/atoms.module.css'

export default function SettingsBtn({ func, icon, text }) {
   return(
      <div className={"displayRow hoverThis " + css.settingsBtn} onClick={func}>
         <div className={css.settingsIcon}><img className={css.settingsIconLogo} src={icon}/></div>
         <div className={css.settingsBtnText}>{text}</div>
      </div>
   )
}