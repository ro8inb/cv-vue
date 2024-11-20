<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { type Ref } from 'vue'

const questions = ref(
    [
        { code: 'features', text: 'Votre outil de gestion informatique manque-t-il de fonctionnalités importantes pour vos opérations ?', answer: '' },
        { code: 'usability', text: 'Vos employés se plaignent-ils de la difficulté d\'utilisation de cet outil ?', answer: '' },
        { code: 'manual_tasks', text: 'Est-ce que des tâches importantes sont encore effectuées manuellement faute de fonctionnalités adaptées dans votre logiciel ?', answer: '' },
        { code: 'performance', text: 'Votre outil présente-t-il des problèmes de performance (lenteur, plantages fréquents) ?', answer: '' },
        { code: 'errors', text: 'Rencontrez-vous des erreurs de traitement des données ou des bugs fréquents ?', answer: '' },
        { code: 'version', text: 'Votre logiciel utilise-t-il une version obsolète de l\'éditeur ?', answer: '' },
        { code: 'support', text: 'Avez-vous du mal à obtenir de l\'aide pour améliorer ou maintenir votre outil ?', answer: '' },
        { code: 'regulations', text: 'Votre logiciel pose-t-il des problèmes pour s\'adapter aux nouvelles réglementations et normes de votre secteur ?', answer: '' },
        { code: 'integration', text: 'Avez-vous du mal à intégrer votre logiciel avec d\'autres logiciels et outils que vous utilisez ?', answer: '' },
        { code: 'scalability', text: 'Pensez-vous que l\'outil sera trop limité pour gérer une augmentation de l\'activité ?', answer: '' },
        { code: 'security_issues', text: 'Avez-vous déjà rencontré des problèmes de sécurité (p. ex. violations de données) avec votre outil ?', answer: '' }
    ]
);
const showResults = ref(false);
const yesCount = ref(0);
const validateDisabled = ref(true);
const tips: Ref<{}[]> = ref([]);
const resultSection = ref<HTMLDivElement | null>(null);


const evaluateResults = () => {
    tips.value = [];
    yesCount.value = questions.value.filter(question => question.answer === 'yes').length;
    if (questions.value.find(question => question.code === 'features')?.answer === 'yes') {
        tips.value.push('Des fonctionnalités supplémentaires peuvent être ajoutées pour mieux répondre à l’évolution de votre activité.');
    }

    if (questions.value.find(question => question.code === 'usability')?.answer === 'yes') {
        tips.value.push('Pour éviter la fatigue de vos employés, quelques ajustements dans le design ou les fonctionnalités peuvent améliorer l’utilisation.');
    }

    if (questions.value.find(question => question.code === 'manual_tasks')?.answer === 'yes') {
        tips.value.push('Les tâches manuelles compliquent la gestion et peuvent provoquer des erreurs. Ajouter des fonctionnalités pour centraliser les processus peut aider.');
    }

    if (questions.value.find(question => question.code === 'regulations')?.answer === 'yes') {
        tips.value.push('Adapter votre outil aux nouvelles normes vous aide à rester conforme et à travailler plus sereinement.');
    }

    if (questions.value.find(question => question.code === 'version')?.answer === 'yes') {
        tips.value.push('Mettre à jour votre outil est crucial pour bénéficier des dernières mises à jour de sécurité.');
    }

    if (questions.value.find(question => question.code === 'security_issues')?.answer === 'yes') {
        tips.value.push('Renforcer la sécurité de votre outil est essentiel pour protéger vos données contre les violations et autres menaces.');
    }

    showResults.value = true;
};

watch(questions.value, (questions) => {
    validateDisabled.value = questions.filter(question => question.answer === '').length !== 0;
    tips.value = [];
    showResults.value = false;
    if (questions.filter(question => question.answer === '').length === 0) {
        evaluateResults();
        const container: HTMLDivElement | null = resultSection.value;
        if (container) {
            nextTick(() => {
                container.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            })
        }
    }
})
</script>

<template>

    <div id="page-content" class="flex-col mt-5">
        <h1 class="text-6xl mb-2">Évaluation de votre logiciel de gestion</h1>
        <p>Utilisez cette check-list pratique pour évaluer si votre outil de gestion informatique actuel répond toujours
            aux besoins de votre
            entreprise et aux évolutions de votre activité.</p>
        <div class="content-container flex overflow-y-scroll max-h-[70vh]">
            <div class="">
                <div v-for="(question, index) in questions" :key="index">
                    <div class="mt-4 mb-2">
                        {{ question.text }}
                    </div>
                    <div class="flex  ml-2">
                        <div class="flex items-center me-4">
                            <input :id="'inline-radio-' + index" type="radio" value="yes" v-model="question.answer"
                                :name="'inline-radio-group-' + index"
                                class="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label :for="'inline-radio-' + index"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oui</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input :id="'inline-2-radio-' + index" type="radio" value="no" v-model="question.answer"
                                :name="'inline-radio-group-' + index"
                                class="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label :for="'inline-2-radio-' + index"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="result-section mt-10 w-full flex flex-col mx-auto" ref="resultSection">
                <div v-show="showResults" id="suggests-section" class="flex flex-col w-full justify-center p-10">
                    <div v-if="yesCount > 6" class="text-orange-600">Il est probablement temps de moderniser votre
                        logiciel de gestion
                        pour mieux répondre aux
                        besoins
                        de
                        votre entreprise et améliorer son efficacité. <br>
                    </div>
                    <div v-else-if="yesCount > 4 || tips.length > 0" class="text-blue-500">Il pourrait être bénéfique d'examiner les
                        domaines spécifiques
                        nécessitant
                        des
                        améliorations. Une mise à jour ou l'ajout de nouvelles fonctionnalités pourrait suffire.</div>
                    <div class="text-green-500" v-else>Votre logiciel de gestion semble encore adapté, mais restez
                        vigilant et réévaluez
                        régulièrement ses
                        performances
                        et ses fonctionnalités.</div>
                    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                        <li v-for="(tip, index) in tips" :key="index" class="flex mt-2">
                            <svg class="w-3.5 h-3.5 me-2 mt-1 text-orange-500 dark:text-orange-400 flex-shrink-0"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            <span v-html="tip"></span>
                        </li>
                    </ul>
                    <div class="contact-info mt-6 text-center p-6 bg-blue-600 rounded-lg">
                        <p class="text-lg font-semibold text-white">Pour plus d'informations, n'hésitez pas à me
                            contacter :</p>
                        <p class="mt-4">
                            <strong class="text-white font-normal">Email : </strong>
                            <a href="mailto:votreemail@example.com"
                                class="text-gray-800 hover:text-grey-800 hover:underline font-semibold">contact@robinberdier.com</a>
                        </p>
                        <p class="mt-2">
                            <strong class="text-white font-normal">Téléphone : </strong>
                            <a href="tel:+33123456789"
                                class="text-gray-800 hover:text-grey-800 hover:underline font-semibold">+33 6
                                09 73 89 98</a>
                        </p>
                        <p class="mt-2 text-white">Je répondrais à vos questions avec plaisir et nous pourrons trouver,
                            ensemble, la meilleure solution</p>

                        <p class="mt-2 text-white">N'hésitez pas à jeter un oeil à mes compétences et expériences <span>
                                <RouterLink to="/"
                                    class="text-gray-800 hover:text-grey-800 hover:underline font-semibold">ici
                                </RouterLink>
                            </span></p>

                    </div>
                </div>
                <div v-show="!showResults" id="suggests-section" class="flex flex-col w-full justify-center p-10 text-xl px-20 text-center mt-20">
                    Répondez aux questions et retrouvez des conseils et suggestions ici.
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#page-content {
    height: calc(100vh - 20%);
    margin-bottom: 90px;
    width: 70vw;
    padding: 2rem;
    font-weight: normal;
    overflow: normal;

}

.content-container {
    display: grid;
    grid-template-columns: 3fr 2fr;
}

@media (max-width: 1024px) {
    #page-content {
        height: calc(100vh + 250px);
        width: 90vw;
        font-weight: normal;
        padding-left: 5px;
    }

    .content-container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: visible;
        padding-bottom: 60px;
        margin-bottom: 20rem;
    }

    #suggests-section {
        padding: 10px 0 0 0;
    }

    .result-section {
        padding-bottom: 10rem;
    }
}

.questions-section,
.results-section {
    margin-bottom: 5rem;
}

.result-section {
    background-color: var(--color-background-mute);
}


.dark [type='radio']:checked {
    background-size: 1.5em 1.5em;
}
</style>