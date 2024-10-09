import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next"
import {FaSearch} from "react-icons/fa";
import {RxDividerVertical} from "react-icons/rx";
import clsx from "clsx";

import styles from "~/components/Layout/DefaultLayout/Header/Search/Search.module.scss";
import SearchItem from "~/components/Layout/DefaultLayout/Header/Search/SearchItem";
import SearchService from "~/services/searchServices";


function Search() {
    const {t} = useTranslation()

    const [text, setText] = useState("")
    const [data, setData] = useState([])
    const [look, setLook] = useState(false)

    useEffect(() => {
        let timeout
        const fetchData = async () => {
            timeout = setTimeout(async () => {
                try {
                    if (text !== "") {
                        const response = await SearchService.search(text)
                        setData(response.data)
                        return
                    }
                    setData([])
                } catch (error) {
                    console.log(error)
                }
            }, 300)
        }
        fetchData()
        return () => {
            clearTimeout(timeout)
        }
    }, [text])

    const handleText = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        if (data.length !== 0) {
            setLook(true)
            return
        }
        setLook(false)
    }, [data])

    return (
        <div className={clsx(styles.search)}>
            <div className={clsx(styles.containerSearch)}>
                <input onChange={handleText} placeholder={t("navbar-search")} className={clsx(styles.boxSearch)}
                       type={"text"}/>
                <div className={clsx(styles.line)}><RxDividerVertical/></div>
                <span className={clsx(styles.searchIcon)}><FaSearch/></span>
            </div>
            {look && <div className={clsx(styles.listSearch)}>
                {data.map((result) => (
                    <SearchItem key={result.id} data={result}/>
                ))}
            </div> || <div className={clsx(styles.listSearch)}>{t("search-look")}</div>}
        </div>
    )
}

export default Search