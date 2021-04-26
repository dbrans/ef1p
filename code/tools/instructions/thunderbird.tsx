import { Fragment } from 'react';

import { CodeBlock } from '../../react/code';
import { DynamicEntry, Entry } from '../../react/entry';
import { InputProps, RawInput } from '../../react/input';
import { OutputEntriesProps, RawOutputEntries } from '../../react/output-entries';
import { StaticPrompt } from '../../react/prompt';
import { shareStore } from '../../react/share';
import { AllEntries, DynamicEntries, getDefaultVersionedState, ProvidedDynamicEntries, ProvidedEntries, VersionedState, VersioningEvent } from '../../react/state';
import { PersistedStore } from '../../react/store';

/* ------------------------------ Dynamic entries ------------------------------ */

const operatingSystem: DynamicEntry<string, State> = {
    name: 'Operating system',
    description: 'Select the operating system you are using.',
    defaultValue: () => {
        if (navigator.platform.startsWith('Win')) {
            return 'windows';
        } else if (navigator.platform.startsWith('Mac')) {
            return 'macos';
        } else {
            return 'linux';
        }
    },
    inputType: 'select',
    labelWidth: 129,
    selectOptions: {
        windows: 'Windows',
        macos: 'macOS',
        linux: 'Linux',
    },
};

const loggingLevel: DynamicEntry<string, State> = {
    name: 'Logging level',
    description: 'All entries up to the specified level are logged. Use Info to log the communication without too much noise.',
    defaultValue: '3',
    inputType: 'select',
    labelWidth: 95,
    selectOptions: {
        0: 'Disabled',
        1: 'Error',
        2: 'Warning',
        3: 'Info',
        4: 'Debug',
        5: 'Verbose',
    },
};

interface State {
    operatingSystem: string;
    loggingLevel: string;
}

const entries: DynamicEntries<State> = {
    operatingSystem,
    loggingLevel,
};

const store = new PersistedStore<VersionedState<State>, AllEntries<State>, VersioningEvent>(getDefaultVersionedState(entries), { entries }, 'instruction-thunderbird');
const Input = shareStore<VersionedState<State>, ProvidedDynamicEntries<State> & InputProps<State>, AllEntries<State>, VersioningEvent>(store, 'input')(RawInput);
const OutputEntries = shareStore<VersionedState<State>, ProvidedEntries & OutputEntriesProps, AllEntries<State>, VersioningEvent>(store, 'state')(RawOutputEntries);

/* ------------------------------ Static entries ------------------------------ */

const MOZ_LOG: Entry<string> = {
    name: 'Environment variable',
    description: 'Specifies which modules shall be logged at which level.',
    defaultValue: 'MOZ_LOG',
};

const MOZ_LOG_FILE: Entry<string> = {
    name: 'Environment variable',
    description: 'Specifies the path to the log file.',
    defaultValue: 'MOZ_LOG_FILE',
};

const timestamp: Entry<string> = {
    name: 'Option',
    description: 'Entries are logged with the current time.',
    defaultValue: 'timestamp',
};

const append: Entry<string> = {
    name: 'Option',
    description: 'When starting Thunderbird again, new entries are appended to the existing log file instead of overwriting it.',
    defaultValue: 'append',
};

const SMTP: Entry<string> = {
    name: 'Module',
    description: 'Log the entries of the SMTP module at the level specified after the colon.',
    defaultValue: 'SMTP',
};

const POP3: Entry<string> = {
    name: 'Module',
    description: 'Log the entries of the POP3 module at the level specified after the colon.',
    defaultValue: 'POP3',
};

const IMAP: Entry<string> = {
    name: 'Module',
    description: 'Log the entries of the IMAP module at the level specified after the colon.',
    defaultValue: 'IMAP',
};

/* ------------------------------ Transformed entries ------------------------------ */

const command: Entry<string, State> = {
    name: 'Command',
    description: 'The command to set an environment variable.',
    defaultValue: '',
    transform: (_, { operatingSystem }) => operatingSystem === 'Windows' ? 'set' : 'export',
};

const location: Entry<string, State> = {
    name: 'Location',
    description: `The path to the log file. Thunderbird creates the log file if it doesn't exist yet.`,
    defaultValue: '',
    transform: (_, { operatingSystem }) => {
        switch (operatingSystem) {
            case 'windows':
                return '%USERPROFILE%\\Desktop\\thunderbird.moz_log';
            case 'macos':
                return '~/Downloads/thunderbird.moz_log';
            case 'linux':
                return '/tmp/thunderbird.moz_log';
            default:
                console.error('Unknown operating system:', operatingSystem);
                return 'ERROR';
        }
    },
};

const thunderbird: Entry<string, State> = {
    name: 'Command',
    description: 'The command used to start Thunderbird from the command-line interface.',
    defaultValue: '',
    transform: (_, { operatingSystem }) => {
        switch (operatingSystem) {
            case 'windows':
                return '"%ProgramFiles(x86)%\\Mozilla Thunderbird\\thunderbird.exe"';
            case 'macos':
                return '/Applications/Thunderbird.app/Contents/MacOS/thunderbird-bin';
            case 'linux':
                return 'thunderbird';
            default:
                console.error('Unknown operating system:', operatingSystem);
                return 'ERROR';
        }
    },
};

/* ------------------------------ User interface ------------------------------ */

export const toolInstructionThunderbird = <Fragment>
    <Input entries={entries} noHistory/>
    <CodeBlock>
        <StaticPrompt>
            <OutputEntries entries={{ command, MOZ_LOG }}/>=
            <OutputEntries entries={{ timestamp, append }} outputSeparator=","/>,
            <OutputEntries entries={{ SMTP }}/>:<OutputEntries entries={{ loggingLevel }}/>,
            <OutputEntries entries={{ POP3 }}/>:<OutputEntries entries={{ loggingLevel }}/>,
            <OutputEntries entries={{ IMAP }}/>:<OutputEntries entries={{ loggingLevel }}/>
        </StaticPrompt>
        <StaticPrompt>
            <OutputEntries entries={{ command, MOZ_LOG_FILE }}/>=
            <OutputEntries entries={{ location }}/>
        </StaticPrompt>
        <StaticPrompt>
            <OutputEntries entries={{ thunderbird }}/>
        </StaticPrompt>
    </CodeBlock>
</Fragment>;
