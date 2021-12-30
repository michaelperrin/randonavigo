import Link from "next/link"
import { Network } from "../../lib/transport"
import LineIcon from "../LineIcon"
import NetworkIcon from "../NetworkIcon"

type HikePerLineProps = { }

const LineLinks = ({ }: HikePerLineProps) => (
  <div className="md:mb-12">
    <div className="md:shadow-lg md:rounded-xl" style={{ fontFamily: 'Barlow' }}>
      <div className="md:p-5 md:border-t md:border-l md:border-r md:border-gray-100 md:rounded-xl bg-white">
        <h3 className="uppercase text-sm font-bold text-gray-700 mb-4 font-sans-serif">Des randonnées sur toutes les lignes</h3>

        <section className="flex gap-1 mb-4">
          <NetworkIcon network={Network.RER} size={32}/>
          <Link href="/randonnees-par-ligne/randonnees-rer-b">
            <a>
              <LineIcon line="B" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-rer-c">
            <a>
              <LineIcon line="C" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-rer-d">
            <a>
              <LineIcon line="D" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-rer-e">
            <a>
              <LineIcon line="E" size={32} />
            </a>
          </Link>
        </section>

        <section className="flex gap-1 mb-4">
          <NetworkIcon network={Network.Transilien} size={32} />
          <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-h">
            <a>
              <LineIcon line="H" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-j">
            <a>
              <LineIcon line="J" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-l">
            <a>
              <LineIcon line="L" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-n">
            <a>
              <LineIcon line="N" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-p">
            <a>
              <LineIcon line="P" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-r">
            <a>
              <LineIcon line="R" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-u">
            <a>
              <LineIcon line="U" size={32} />
            </a>
          </Link>
        </section>

        <section className="flex gap-1">
          <NetworkIcon network={Network.Tram} size={32} />
          <Link href="/randonnees-par-ligne/randonnees-tram-t2">
            <a>
              <LineIcon line="T2" size={32} />
            </a>
          </Link>
          <Link href="/randonnees-par-ligne/randonnees-tram-t11">
            <a>
              <LineIcon line="T11" size={32} />
            </a>
          </Link>
        </section>
      </div>
    </div>
  </div>
)

export default LineLinks
