const promptDirectory = require('inquirer-directory');
const basePath = `${process.cwd()}/src/app`;

module.exports = function (plop) {
    plop.setPrompt('directory', promptDirectory);
    plop.setGenerator('ngxs-cli', {
        description: 'Create new store',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Store name:',
            },
            {
                type: 'directory',
                name: 'directory',
                message: 'Directory:',
                basePath: basePath,
            },
            {
                type: 'confirm',
                default: false,
                name: 'spec',
                message: 'Add spec for state?',
            },
        ],
        actions: (data) => {
            const { name, spec, directory } = data;
            const actions = [
                addFileByTpl({ directory, folderName: name, file: 'state' }),
                addFileByTpl({ directory, folderName: name, file: 'actions' }),
                addFileByTpl({ directory, folderName: name, file: 'state-model' }),
                addFileByTpl({ directory, folderName: name, file: 'selectors' }),
            ];

            if (spec) {
                actions.push(addFileByTpl({ directory, folderName: name, file: 'state.spec' }));
            }

            return actions;
        },
    });
};

function addFileByTpl({ directory, folderName, file }) {
    const templateFile = `./templates/${file}.tpl`;
    const typescriptFile = `{{\'dashCase\' name}}.${file}.ts`;
    const path = `${basePath}/${directory}/${folderName}/${typescriptFile}`;
    return { type: 'add', skipIfExists: true, path, templateFile };
}
