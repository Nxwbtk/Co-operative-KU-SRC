import { useTranslation } from "@/app/i18n"

export default async function LangPage({ params }: { params: { locale: string } }) {
    const { t } = await useTranslation(params.locale, 'test');
    return <div className="flex justify-center">{t('greeting')}</div>
}