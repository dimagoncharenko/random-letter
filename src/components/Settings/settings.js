import React, { useEffect } from 'react';

const Settings = ({ settings, setSettings }) => {
    useEffect(() => {
        if (!Object.keys(settings).length) {
            return;
        }
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    const onChangeUnique = () => {
        setSettings((prevSettings) => {
            return {
                ...prevSettings,
                isUnique: !prevSettings.isUnique,
            };
        });
    };

    const onChangeAnimation = () => {
        setSettings((prevSettings) => {
            return {
                ...prevSettings,
                isAnimation: !prevSettings.isAnimation,
            };
        });
    };

    return (
        <div className="settings">
            <h2>Настройки</h2>
            <label>
                <input type="checkbox" name="unique" onChange={onChangeUnique} checked={settings.isUnique || false} />
                <span>Буквы должны быть уникальные</span>
            </label>
            <label>
                <input
                    type="checkbox"
                    name="animation"
                    onChange={onChangeAnimation}
                    checked={settings.isAnimation || false}
                />
                <span>Включить анимацию</span>
            </label>
        </div>
    );
};

export default Settings;
