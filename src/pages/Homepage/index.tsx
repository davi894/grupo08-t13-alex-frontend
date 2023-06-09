import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    AsideHomePage,
    Banner,
    Cards,
    FooterHomePage,
    Header,
} from "../../components";
import instanceAxios from "../../services";
import { Section, Ul } from "../../styled";
import SectionHome from "./styled";

export const Homepage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [adversaments, setAdversaments] = useState<any[]>([]);
    const [filters, setFilters] = useState({});
    const [totalPage, setTotalPage] = useState();
    const [filtered, setFiltered] = useState<object[]>([]);
    const [pageNumber, setPageNumber] = useState(0);

    const getAdversaments = async () => {
        const responseAdversaments = await instanceAxios.get(
            `ads?page=${pageNumber}`
        );
        setPageNumber(responseAdversaments.data.page);
        setTotalPage(responseAdversaments.data.totalPage);
        setAdversaments(responseAdversaments.data.ads);
    };

    if (location.pathname === "/homepage") {
        useEffect(() => {
            getAdversaments();
        }, [location.pathname, pageNumber]);
    }

    return (
        <SectionHome>
            <Header />
            <Banner />
            <Section>
                <AsideHomePage
                    setFilters={setFilters}
                    filters={filters}
                    filtered={filtered}
                    adversaments={adversaments}
                    setFiltered={setFiltered}
                    setAdversaments={setAdversaments}
                />
                <div id="formart">
                    <Ul>
                        {filtered.length > 0 ? (
                            filtered.map((e: any) => {
                                let siglaName = "";

                                if (e.user.name.includes(" ")) {
                                    const sigla = e.user.name.split(" ");
                                    siglaName += sigla[0][0] + sigla[1][1];
                                } else {
                                    siglaName += e.user.name[0];
                                }
                                return (
                                    <Cards
                                        onClick={() =>
                                            navigate("/profile/user")
                                        }
                                        idAmount={e.user.id}
                                        src={e.images[0]}
                                        marca={e.brand}
                                        descricao={e.description}
                                        km={e.mileage}
                                        name={e.user.name}
                                        ano={e.year}
                                        preco={e.price}
                                        siglaNanme={siglaName}
                                        idAds={e.id}
                                    >
                                        {e.price < 10000 ? (
                                            <span className="cifrao">$</span>
                                        ) : null}
                                    </Cards>
                                );
                            })
                        ) : adversaments ? (
                            adversaments.map((e: any) => {
                                let siglaName = "";

                                if (e.user.name.includes(" ")) {
                                    const sigla = e.user.name.split(" ");
                                    siglaName += sigla[0][0] + sigla[1][1];
                                } else {
                                    siglaName += e.user.name[0];
                                }
                                if (e.published === true) {
                                    return (
                                        <Cards
                                            onClick={() =>
                                                navigate("/profile/user")
                                            }
                                            idAmount={e.user.id!}
                                            src={e.images[0]}
                                            marca={e.brand}
                                            descricao={e.description}
                                            km={e.mileage}
                                            name={e.user.name}
                                            ano={e.year}
                                            preco={e.price}
                                            siglaNanme={siglaName}
                                            idAds={e.id!}
                                        >
                                            {e.price < 10000 ? (
                                                <span className="cifrao">
                                                    $
                                                </span>
                                            ) : null}
                                        </Cards>
                                    );
                                }
                            })
                        ) : (
                            <></>
                        )}
                    </Ul>

                    <div id="page">
                        {pageNumber === 0 ? null : (
                            <span
                                id="anterior"
                                onClick={() => setPageNumber(pageNumber - 1)}
                            >
                                {"<"} Anterior
                            </span>
                        )}

                        <span>
                            <strong>{pageNumber}</strong> de {totalPage}
                        </span>

                        {pageNumber + 1 === totalPage ? null : (
                            <span
                                id="seguinte"
                                onClick={() => setPageNumber(pageNumber + 1)}
                            >
                                {" "}
                                Seguinte {">"}{" "}
                            </span>
                        )}
                    </div>
                </div>
            </Section>
            <FooterHomePage />
            <div className="editAdsModal"></div>
        </SectionHome>
    );
};
